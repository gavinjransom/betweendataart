let
    Source = Table.FromRows(Json.Document(Binary.Decompress(Binary.FromText("i45WikwtVtJRMlSK1YlW8ssHMo2UYmMB", BinaryEncoding.Base64), Compression.Deflate)), let _t = ((type nullable text) meta [Serialized.Text = true]) in type table [#"Y/N" = _t, #"#" = _t]),
    #"Changed Type" = Table.TransformColumnTypes(Source,{{"Y/N", type text}, {"#", Int64.Type}})
in
    #"Changed Type"