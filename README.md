# ibrokersapp

Para optener los archivos necesarios para iniciar el programa.
`./bin/secrets unbuild -p {SECRET_KEY}`


```bash
# Para combertir el .der en .pem
openssl x509 -inform der -in upload_cert.der -out output.pem

# Para insertar el pem en un jks
keytool -import -alias key0 -file output.pem -keystore app.jks -storepass oracle123 -keypass oracle123

```
