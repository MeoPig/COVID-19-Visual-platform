import time
import pymysql
def get_time():
    time_str=time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年","月","日")

def get_conn():
    conn=pymysql.connect(host="127.0.0.1",
                         user="root",
                         password="root",
                         db="cov",
                         charset="utf8")
    cursor=conn.cursor()
    return conn,cursor
def close_conn(conn,cursor):
    cursor.close()
    conn.close()

def query(sql,*args):
    conn,cursor=get_conn()
    cursor.execute(sql,args)
    res=cursor.fetchall()
    close_conn(conn,cursor)
    return res

def get_c1_data():
    # sql="SELECT confirmedCount,suspectedCount,curedCount,deadCount FROM countrydata"\
    #     " WHERE countryName='中国'"\
    #     "and dateId=(select max(dateId) from countrydata WHERE countryName='中国')"
    sql="SELECT confirm,suspect,heal,dead FROM HISTORY ORDER BY ds DESC LIMIT 1;"
    res=query(sql)
    return res[0]
def get_c2_data():
    # sql ="select provinceShortName,confirmedCount from china_provincedata" \
    #     " where dateId=(select max(dateId) from china_provincedata) "
    #     # "order by dateId desc limit 1) "
    sql= "select province,sum(confirm) from details " \
          "where update_time=(select update_time from details " \
          "order by update_time desc limit 1) " \
          "group by province"
    res = query(sql)
    return res
def get_c2_1_data():#返回各市数据
    sql = "select city,confirm from details " \
           "where update_time=(select update_time from details " \
           "order by update_time desc limit 1) " \
           "and city<>'境外输入'"
    res1=query(sql)
    return res1
def get_l1_data():
    # sql = "select ds,confirm,suspect,heal,dead from history"
    sql="select dateId,confirmedCount,suspectedCount,curedCount,deadCount from countrydata" \
        " where countryName='中国'"
    res = query(sql)
    return res
def get_r2_data():
    sql = "select confirmedCount,dateId from countrydata " \
          "where countryName='中国'"
    res=query(sql)
    return res
    # sql="select city,confirm from"
def get_l2_data():
    # sql = "select ds,confirm_add,suspect_add,heal_add,dead_add from history"
    sql = "select dateId,confirmedIncr,suspectedCountIncr from countrydata" \
          " where countryName='中国'"
    res = query(sql)
    return res
def get_r1_data():
    """
    :return:  返回国外地区确诊人数前10名
    """
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_beimeizhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='北美洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_worlddata():
    sql="SELECT continent,SUM(confirmedCount)AS confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) AND continent<>'其他'  GROUP BY continent"
    res = query(sql)
    return res
def get_nanmeizhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='南美洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_yazhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='亚洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_feizhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='非洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_dayangzhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='大洋洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
def get_ouzhou_data():
    sql="SELECT countryName,confirmedCount FROM countrydata WHERE dateId=(SELECT MAX(dateId) FROM countrydata) and continent='欧洲' ORDER BY confirmedCount DESC LIMIT 10"
    res = query(sql)
    return res
if __name__ == '__main__':
    print(get_c1_data())