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

`
compile_android
The Android App Bundle was signed with the wrong key. 

- Found:      SHA1: 68:AF:6B:7C:2B:EF:5B:F0:8C:3D:B1:F1:0F:F7:F6:DD:8C:33:7D:04
- expected:   SHA1: EA:20:54:2C:21:0D:51:33:41:F5:64:3E:2C:D7:EB:51:4F:F4:8D
`

keytool -exportcert -keystore app.jks -alias key0 -file servisoftsapp.crt




- Despues de descargar el proyexto desde git es necesario configurar la direccion del sdk de android. Para esto se crear un archivo 
en la raiz de la carpeta android con el nombre `local.properties` y este contiene el campo `sdk.dir=<direccion del sdk>`
- Luego ejecutar el comando `./bin/secrets unbuild -p <la contraena que se encuentra en el repo secrets>`
- Una vez agregada esa direccion hay que hacer `npm install` para agregar los node_modules
- Luego npm start y deberia funcionar correctamente.