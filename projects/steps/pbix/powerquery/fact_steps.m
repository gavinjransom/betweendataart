let
    Source = Sql.Databases("between-data-art.database.windows.net"),
    #"Between-Data-Art-db" = Source{[Name="Between-Data-Art-db"]}[Data],
    dbo_fact_steps = #"Between-Data-Art-db"{[Schema="dbo",Item="fact_steps"]}[Data],
    #"Sorted Rows" = Table.Sort(dbo_fact_steps,{{"Daily_Total", Order.Descending}}),
    #"Added Index" = Table.AddIndexColumn(#"Sorted Rows", "Index", 1, 1, Int64.Type)
in
    #"Added Index"