## Getting started

### Deploy the function

Authenticate

```
gcloud auth login
```

Deploy the cloud function

```
gcloud beta functions deploy helloWorld --source src/helloWorld/ --stage-bucket gs://{your-bucket-name} --trigger-http
```


### Test your newly created function

The deploy command will display the `url` under `httpsTrigger`

```
  curl -XPOST -H "Content-Type:application/json" \
  -d '{"message": "Hi there"}' \
  {the-returned-url}
```

 curl -H "Content-Type: application/json" -X POST -d '{"kind":"Order","key":"order1","value":{"description":"8KG"}}'

