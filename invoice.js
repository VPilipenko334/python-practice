    function bill_for(month, active_subscription, users) {
        let a_date, cost, d_date, daily_rate, days_in_month, first_day, last_day, no_of_days_active, total_cost;
        month = datetime.datetime.strptime(month, "%Y-%m");
        month = datetime.date(month.year, month.month, 1);
        first_day = first_day_of_month(month);
        last_day = last_day_of_month(month);
        days_in_month = (last_day - first_day).days + 1;

        if (active_subscription === null) {
            return 0;
        }

        daily_rate = 0;
        cost = active_subscription["monthly_price_in_dollars"];
        daily_rate += Number.parseFloat(cost) / days_in_month;
        total_cost = 0;

        for (let user, _pj_c = 0, _pj_a = users, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
            user = _pj_a[_pj_c];
            $date = user["deactivated_on"];
            a_date = user["activated_on"];

            if ($date !== null) {
                if ($date < month) {
                    total_cost += 0;
                } else {
                    no_of_days_active = abs($date - first_day).days + 1;
                    total_cost += no_of_days_active * daily_rate;
                }
            }

            if ($date === null) {
                if (a_date >= first_day && a_date <= last_day) {
                    no_of_days_active = abs(a_date - last_day).days + 1;
                    total_cost += no_of_days_active * daily_rate;
                } else {
                    total_cost += days_in_month * daily_rate;
                }
            }
        }

        return round(total_cost, 2);
    }

function first_day_of_month(date) {
    /*
    Takes a datetime.date object and returns a datetime.date object
    which is the first day of that month. For example:
     >>> first_day_of_month(datetime.date(2019, 2, 7))  # Feb 7
    datetime.date(2019, 2, 1)                          # Feb 1
     Input type: datetime.date
    Output type: datetime.date
    */
    return date.replace({
        "day": 1
    });
}

function last_day_of_month(date) {
    /*
    Takes a datetime.date object and returns a datetime.date object
    which is the last day of that month. For example:
     >>> last_day_of_month(datetime.date(2019, 2, 7))  # Feb  7
    datetime.date(2019, 2, 28)                        # Feb 28
     Input type: datetime.date
    Output type: datetime.date
    */
    let last_day;
    last_day = calendar.monthrange(date.year, date.month)[1];
    return date.replace({
        "day": last_day
    });
}

function next_day(date) {
    /*
    Takes a datetime.date object and returns a datetime.date object
    which is the next day. For example:
     >>> next_day(datetime.date(2019, 2, 7))   # Feb 7
    datetime.date(2019, 2, 8)                 # Feb 8
     >>> next_day(datetime.date(2019, 2, 28))  # Feb 28
    datetime.date(2019, 3, 1)                 # Mar  1
     Input type: datetime.date
    Output type: datetime.date
    */
    return date + datetime.timedelta({
        "days": 1
    });
}


// console.log(bill_for(2019, 2, 7))
console.log(first_day_of_month(datetime.date(2019, 2, 7)))