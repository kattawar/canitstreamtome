from app import app

# hits coinbase api endpoints for a coin ticker "BTC"
# DEPRECATED STYLE
def sample_api_get_request(coin):
    coin= coin.upper()
    url_rate = 'https://api.coinbase.com/v2/exchange-rates?currency=' + coin
    url_buy = 'https://api.coinbase.com/v2/prices/'+coin+'-USD/buy'
    url_sell = 'https://api.coinbase.com/v2/prices/' + coin + '-USD/sell'

    #price
    time = get_time()
    req = urllib.request.Request(url_rate)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    price = cont['data']['rates']['USD']
    print(cont['data']['rates']['USD'])

    #buy rate
    req = urllib.request.Request(url_buy)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    buy_rate = cont['data']['amount']
    print(cont['data']['amount'])

    #sell rate
    req = urllib.request.Request(url_sell)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    sell_rate = cont['data']['amount']
    print(cont['data']['amount'])

    insert_coinbase_btc_usd(price, buy_rate, sell_rate, time)

    return 1

# insert to coinbase btc usd table
# DEPRECATED STYLE
def sample_db_insert(price, buy_rate, sell_rate, time):
    conn = None
    try:
        conn = psycopg2.connect(host="swe-db.coznr5ylokhg.us-east-2.rds.amazonaws.com",
                                database="canitstreamtome_db", user="canitstreamtome", password="swegrp18")
        # create a cursor
        cur = conn.cursor()

        # execute a statement
        date = str(datetime.now()) + '+00'

        table_name ='public.coinbase_btc_usd'

        sql_insert_query = "INSERT INTO {0} (price, buy, sell, timestamp) VALUES ({1}, {2}, {3}, \'{4}\')".format(
            table_name, price, buy_rate, sell_rate, time)

        cur.execute(sql_insert_query)

        # wrap up and commit
        conn.commit()
        cur.close()
    except psycopg2.DatabaseError as error:
        print("ERROR%")
        print(error)
    finally:
        if conn is not None:
            conn.close()
            #print('Database connection closed.')
