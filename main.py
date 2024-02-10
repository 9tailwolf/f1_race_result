import argparse
from classes.DataSaver import DataSaver
import json
def get_argparse():
    parser = argparse.ArgumentParser(description="")
    parser.add_argument('--mode', default='year', type=str,
                        help='Input year when you save year data. If you want to save one event, type any input except "year".')
    parser.add_argument('--round', default='Singapore', type=str,
                        help='Input round of race data that you want to get.')
    parser.add_argument('--year', default=2023, type=int,
                        help='Input year of race data that you want to get.')
    return parser

def main(args=None):
    #with open('./data/' + 'data' + '.json', 'r') as f:
    #    data = json.load(f)
    #print(data['years_option'])
    data_saver = DataSaver('data')
    if args.mode=='year':
        data_saver.save_Racedata_year(args.year)
    else:
        data_saver.save_Racedata_circuit(args.year,args.round)

if __name__ == '__main__':
    args = get_argparse().parse_args()
    main(args)

