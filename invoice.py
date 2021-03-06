def bill_for(month, active_subscription, users):

    month = datetime.datetime.strptime(month, '%Y-%m')
    month = datetime.date(month.year, month.month, 1)

    first_day = first_day_of_month(month)

    last_day = last_day_of_month(month)

    days_in_month = (last_day - first_day).days + 1

    if active_subscription is None:
        return 0 

    daily_rate = 0
    cost = active_subscription["monthly_price_in_dollars"]
    daily_rate += float(cost) / days_in_month 
    total_cost = 0 

    for user in users:
        d_date = user["deactivated_on"]
        a_date = user["activated_on"]

    if d_date is not None: 
        if d_date < month: 
            total_cost += 0
        else:
            no_of_days_active = abs((d_date - first_day)).days + 1
            total_cost += no_of_days_active * daily_rate

    if d_date is None: 
        if a_date >= first_day and a_date <= last_day:
        no_of_days_active = abs((a_date - last_day)).days + 1
        total_cost += no_of_days_active * daily_rate
        else: 
            total_cost += days_in_month * daily_rate

        return round(total_cost, 2)
