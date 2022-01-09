from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
import utils

app = Flask(__name__)


@app.route('/')
def hello_world():
    img = io.BytesIO()
    N = 1e7 + 10 + 5
    # simuation Time / Day
    T = 170
    # susceptiable ratio
    s = np.zeros([T])
    # exposed ratio
    e = np.zeros([T])
    # infective ratio
    i = np.zeros([T])
    # remove ratio
    r = np.zeros([T])

    # contact rate
    lamda = 0.3581  # 每个患者每天接触感染人数
    # recover rate
    gamma = 0.037  # 治疗率
    # exposed period
    sigma = 1 / 4  # 潜伏期的倒数

    # initial infective people
    i[0] = 10.0 / N  # 感染者比列
    s[0] = 1e7 / N  # 易感者比列
    e[0] = 40.0 / N  # 潜伏者比列
    for t in range(T - 1):
        s[t + 1] = s[t] - lamda * s[t] * i[t]
        e[t + 1] = e[t] + lamda * s[t] * i[t] - sigma * e[t]
        i[t + 1] = i[t] + sigma * e[t] - gamma * i[t]
        r[t + 1] = r[t] + gamma * i[t]
    fig, ax = plt.subplots(figsize=(3.9,2.5))
    ax.plot(s, c='b', lw=2, label='S')
    ax.plot(e, c='orange', lw=2, label='E')
    ax.plot(i, c='r', lw=2, label='I')
    ax.plot(r, c='g', lw=2, label='R')
    ax.set_xlabel('Day', fontsize=8)
    ax.set_ylabel('Infective Ratio', fontsize=8)
    ax.grid(1)
    plt.xticks(fontsize=8)
    plt.yticks(fontsize=8)
    plt.legend()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return render_template("main.html", plot_url=plot_url)

@app.route("/c1")
def get_c1_data():
    data = utils.get_c1_data()
    return jsonify({"confirm":data[0],"suspect":data[1],"heal":data[2],"dead":data[3]})

@app.route("/c2")
def get_c2_data():
    res = []
    res1=[]
    for tup in utils.get_c2_data():
        res.append({"name": tup[0], "value": tup[1]})
    for tup1 in utils.get_c2_1_data():
        res1.append({"name": tup1[0], "value": tup1[1]})
    return jsonify({"data":res,"data1":res1})

@app.route("/l1")
def get_l1_data():
    data = utils.get_l1_data()
    day,confirm,suspect,heal,dead = [],[],[],[],[]
    for a,b,c,d,e in data[:]:
        day.append(a) #a是datatime类型.strftime("%m-%d")
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"day":day,"confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead})
@app.route("/r2")
def getmat():
    plot_url=utils.hello_world()
    return render_template("main.html",plot_url=plot_url)

@app.route("/l2")
def get_l2_data():
    data = utils.get_l2_data()
    day, confirm_add, suspect_add = [], [], []
    for a, b, c in data[7:]:
        day.append(a)  # a是datatime类型
        confirm_add.append(b)
        suspect_add.append(c)
    return jsonify({"day": day, "confirm_add": confirm_add, "suspect_add": suspect_add})

@app.route("/r1")
def get_r1_data():
    data = utils.get_r1_data()
    city = []
    confirm = []
    for k,v in data:
        city.append(k)
        confirm.append(int(v))
    return jsonify({"city": city, "confirm": confirm})

@app.route("/time")
def get_time():
    return utils.get_time()

# @app.route('/ajax',methods=["get","post"])
# def hello_world4():
#     name = request.values.get("name")
#     score =  request.values.get("score")
#     print(f"name:{name},score:{score}")
#     return '10000'
@app.route("/beimei")
def get_beimeizhou_data():
    worlddata = utils.get_worlddata()
    yazhoudata=utils.get_yazhou_data()
    ouzhoudata = utils.get_ouzhou_data()
    dayangdata=utils.get_dayangzhou_data()
    feizhoudata=utils.get_feizhou_data()
    nanmeidata=utils.get_nanmeizhou_data()
    beimeidata=utils.get_beimeizhou_data()

    continent = []
    confirmedCount = []
    yazhoucontinent = []
    yazhouconfirmedCount = []
    ouzhoucontinent = []
    ouzhouconfirmedCount = []
    dayangcontinent = []
    dayangconfirmedCount = []
    feizhoucontinent = []
    feizhouconfirmedCount = []
    nanmeicontinent = []
    nanmeiconfirmedCount = []
    beimeicontinent = []
    beimeiconfirmedCount = []
    for k, v in worlddata:
        continent.append(k)
        confirmedCount.append(v)
    for k, v in yazhoudata:
        yazhoucontinent.append(k)
        yazhouconfirmedCount.append(v)
    for k, v in ouzhoudata:
        ouzhoucontinent.append(k)
        ouzhouconfirmedCount.append(v)
    for k, v in dayangdata:
        dayangcontinent.append(k)
        dayangconfirmedCount.append(v)
    for k, v in feizhoudata:
        feizhoucontinent.append(k)
        feizhouconfirmedCount.append(v)
    for k, v in nanmeidata:
        nanmeicontinent.append(k)
        nanmeiconfirmedCount.append(v)
    for k, v in beimeidata:
        beimeicontinent.append(k)
        beimeiconfirmedCount.append(v)
    return jsonify({"continent": continent, "confirmedCount": confirmedCount,
                    "yazhoucontinent": yazhoucontinent, "yazhouconfirmedCount": yazhouconfirmedCount,
                    "ouzhoucontinent": ouzhoucontinent, "ouzhouconfirmedCount": ouzhouconfirmedCount,
                    "dayangcontinent": dayangcontinent, "dayangconfirmedCount": dayangconfirmedCount,
                    "feizhoucontinent": feizhoucontinent, "feizhouconfirmedCount": feizhouconfirmedCount,
                    "nanmeicontinent": nanmeicontinent, "nanmeiconfirmedCount": nanmeiconfirmedCount,
                    "beimeicontinent": beimeicontinent, "beimeiconfirmedCount": beimeiconfirmedCount,
                    })

if __name__ == '__main__':
    app.run()
