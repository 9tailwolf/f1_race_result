# 🏎️ Formula1 Race Result (0.1.0 Beta)
You can see this project at [http://f1raceresult.xyz](http://f1raceresult.xyz)

`f1_race_result` is my **first front-end project** that summarizes Formula1 race results by `bar-chart-race`. For now, you can see all race results after 2022.

The above site is optimized for laptop or desktop screens.

Please send all `bug reports` by email here.

doryeon514@gm.gist.ac.kr / doryeon514@gmail.com


### **Details**


1. **Data Processing**

I use [Fast-F1](https://github.com/theOehrly/Fast-F1) python package to access race session data.

typing below in terminal can generate data for Formula1 Race Result:
```bash
python main.py --year=2023
```

or
```bash
python main.py --mode=one --year=2023 --circuit=bahrain
```

You can download requirement package by following.
```bash
pip install -r requirements.txt
```

Generate data used by bar-chart-race through the [RaceDataProcessor.py](./classes/RaceDataProcessor.py)  file. Therefore, data management is performed manually rather than automatically. My future plan is to automate this through the API within the js file.


2. **Bar-Chart-Race**

I use [react](https://ko.legacy.reactjs.org) for web page, and published by [giuhub-page](https://pages.github.com). I modified [ChartRace.js](./src/ChartRace.js) and [styleChart.css](./src/styleChart.css) to suit my needs. All code comes from [react-chart-race](https://github.com/ugurdalkiran/react-chart-race).


3. **Other Designs**

I use [react-select](https://github.com/jedwatson/react-select) for select box. And I refer [CSS Scan](https://getcssscan.com/css-buttons-examples) page for button.

### **Update History**


#### **0.1.0 Beta** : Feb 12th, 2024
    - Published on a web page.