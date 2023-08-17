# ibrokersapp

Para optener los archivos necesarios para iniciar el programa.
`./bin/secrets unbuild -p {SECRET_KEY}`


```bash
# Para combertir el .der en .pem
openssl x509 -inform der -in upload_cert.der -out output.pem

# Para insertar el pem en un jks
keytool -import -alias key0 -file output.pem -keystore app.jks -storepass pass -keypass pass


echo y |
keytool -genkeypair -dname "cn=Strasol, ou=Strasol, o=SRL, c=BO" -alias key0 -keypass pass -keystore android.keystore -storepass pass -validity 20000
echo y | keytool -genkeypair -dname "cn=Strasol, ou=Strasol, o=SRL, c=BO" -alias key0 -keypass pass -keyalg RSA -keysize 2048 -sigalg SHA256withRSA -validity 365 -keystore app.jks  -storepass pass

```
