import fastf1
import pandas

class RaceDataProcessor:
    def __init__(self,year:int,circuit:str):
        self.year = year
        self.circuit = circuit
        self.race = fastf1.get_session(self.year, self.circuit, 'R')
        self.race.load()
        self.driverSetup()

    def getGaptoAnother(self, driver_name):
        gap_result = []
        driver_laps = self.race.laps.pick_driver(driver_name).reset_index()
        print(driver_name)
        for i in range(self.race.total_laps):
            for sector in ["Sector1SessionTime", "Sector2SessionTime", "Sector3SessionTime"]:
                try:
                    target_laps = min(self.race.laps.pick_lap(i+1)[sector])
                    if type(driver_laps[sector][i]) == pandas._libs.tslibs.timedeltas.Timedelta and type(
                            target_laps) == pandas._libs.tslibs.timedeltas.Timedelta:
                        gap_result.append((driver_laps[sector][i] - target_laps).total_seconds())
                    else:
                        gap_result.append(pandas.NA)
                except:
                    break
        if self.race.results['ClassifiedPosition'][driver_name] in 'RW':
            while self.race.total_laps * 3 > len(gap_result):
                gap_result.append(-1)

        while self.race.total_laps * 3 > len(gap_result):
            gap_result.append(gap_result[-1])
        return [self.race.get_driver(driver_name)['Abbreviation'], self.race.get_driver(driver_name)['TeamName']] + [int(self.race.get_driver(driver_name)['GridPosition']) - 1 if int(self.race.get_driver(driver_name)['GridPosition'])!=0 else len(self.drivers)-1]+gap_result[1:]

    def getGapDictionary(self):
        corrected_dataframe = pandas.DataFrame({num:self.getGaptoAnother(num) for num in self.drivers}).fillna(method='ffill').transpose()
        Columns = ['Driver Name', 'Team Name'] + [str((i + 3) // 3) + ' Laps ' + str(i%3+1) + ' Sector'  for i in range(self.race.total_laps * 3)]
        corrected_dataframe.columns = Columns
        self.df = corrected_dataframe
        self.json = []
        last = ""
        ldata = {}
        for i in self.df.columns[2:]:
            data = []
            for num in self.drivers:
                d = self.race.get_driver(num)
                if self.df[i][num]!= -1:
                    d = {'id':num,'title':d['Abbreviation'],'value':round(self.df[i][num],3),'color':'#'+d['TeamColor']}
                    data.append(d)
                    ldata[num] = round(self.df[i][num],3)

            self.json.append({'lap':i,'data':data})
            last = i

        data = []
        res = self.race.results['Time']
        res[self.drivers[0]] = res[self.drivers[0]] - res[self.drivers[0]]
        for num in self.drivers:
            d = self.race.get_driver(num)
            if self.race.results['Status'][num]=='Finished':
                value = round(res[num].total_seconds(), 3)
            elif self.race.results['Status'][num][0]=='+':
                value = ldata[num]
            else:
                continue
            d = {'id': num, 'title': d['Abbreviation'], 'value':value ,
                 'color': '#' + d['TeamColor']}
            data.append(d)

        self.json.append({'lap':last, 'data': data})


        return {"data":self.json,"end":self.race.total_laps * 3 + 1}


    def driverSetup(self):
        self.drivers = []
        for d in self.race.drivers:
            self.drivers.append(d)