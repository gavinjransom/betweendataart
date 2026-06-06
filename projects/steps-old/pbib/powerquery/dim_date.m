let
    Source = Sql.Databases("between-data-art.database.windows.net"),
    #"Between-Data-Art-db" = Source{[Name="Between-Data-Art-db"]}[Data],
    dbo_dim_date = #"Between-Data-Art-db"{[Schema="dbo",Item="dim_date"]}[Data]
in
    dbo_dim_date