import json
import fastf1
import os

from classes.RaceDataProcessor import RaceDataProcessor
class DataSaver:
    def __init__(self,file):
        self.file = file
        try:
            with open('./data/'+file+'.json', 'r') as f:
                self.data = json.load(f)
        except:
            self.data = {'years':[],'years_option':[]}

    def get_racedata(self, year, circuit):
        raceDataProcessor = RaceDataProcessor(year, circuit)
        if str(year) not in self.data['years']:
            self.data[str(year)] = {'circuits':[],'circuits_option':[]}
            self.data['years'].append(str(year))
            self.data['years_option'].append({"value":str(year),"label":str(year)})

        if circuit not in self.data[str(year)]['circuits']:
            self.data[str(year)]['circuits'].append(circuit)
            self.data[str(year)]['circuits_option'].append({"value":str(circuit),"label":str(circuit)})


        res = raceDataProcessor.getGapDictionary()
        self.data[str(year)][circuit] = res

    def save_Racedata_year(self,year):
        schedule = fastf1.get_event_schedule(year)['OfficialEventName']
        for circuit in schedule[1:]:
            self.get_racedata(year,circuit)
        self.save()

    def save_Racedata_circuit(self,year,Round):
        schedule = fastf1.get_event_schedule(year)['OfficialEventName']
        if Round==0 or len(schedule)>=Round:
            raise 'Round Error'
        self.get_racedata(year,schedule.iloc[Round])
        self.save()


    def save(self):
        if os.path.isdir('data') == False:
            os.mkdir('data')
        try:
            os.remove('./data/' + self.file + '.json')
        except:
            pass
        with open('./data/' + str(self.file) + '.json', 'w') as data:
             json.dump(self.data, data, indent=4)