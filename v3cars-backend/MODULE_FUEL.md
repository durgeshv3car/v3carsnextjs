Fuel Prices module (Petrol/Diesel/CNG) — latest price, previous day delta, listings, and last-N-days history for states and cities.

Conventions

Fuel types
1 = Petrol, 2 = Diesel, 3 = CNG

Quick test URLs (same as before, now backed by old logic)

Latest (no history)

All 3 fuels (4 metros):
http://localhost:3121/v1/fuel/metros

Petrol only:
http://localhost:3121/v1/fuel/metros?fuelType=1

Diesel only:
http://localhost:3121/v1/fuel/metros?fuelType=2

CNG only:
http://localhost:3121/v1/fuel/metros?fuelType=3

Last N days history

All 3 fuels, last 10 days:
http://localhost:3121/v1/fuel/metros?days=10

Petrol, last 10 days:
http://localhost:3121/v1/fuel/metros?fuelType=1&days=10

Diesel, last 7 days:
http://localhost:3121/v1/fuel/metros?fuelType=2&days=7

CNG, last 30 days:
http://localhost:3121/v1/fuel/metros?fuelType=3&days=30





City today price:
/v1/fuel/price/latest?fuelType=1&districtId=1489

State today price:
/v1/fuel/price/latest/popular?fuelType=1&stateId=29

City 10-day history:
/v1/fuel/price/history?fuelType=1&districtId=1489&days=10

State 10-day history:
/v1/fuel/price/history?fuelType=1&stateId=29&days=10

State-wise list (one fuel):
/v1/fuel/states?fuelType=1&limit=10&page=1&sortBy=name_asc

Cities in a state (use popular flag = 1 for top cities list):l
/v1/fuel/cities?fuelType=1&stateId=29&limit=10&page=1

State-wise combined (petrol/diesel/cng):
/v1/fuel/states/combined?limit=50&page=1

Combined 10-day history (all fuels) for state or city:
/v1/fuel/price/history/combined?stateId=29&days=10
/v1/fuel/price/history/combined?districtId=1489&days=10

Last Six Month Trends
/v1/fuel/monthly/trends?fuelType=1&cityId=1489&months=6
/v1/fuel/monthly/trends?fuelType=1&districtId=17&months=6


faq -
/v1/faqs?moduleId=16&pageType=1&fuelType=1&limit=50&page=1

