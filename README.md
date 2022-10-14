# Reproduction

### To reproduce fire up the application:

```ts
yarn run dev
```

### Open the application

```
http://localhost:3000
```

### In the navbar try to press the Sign In Button:
You will see that clicking the button will not navigate
you to the `/sign-in` page:
![navbar image](./asset/navbar.png)

### Open the console and you will see the logs
The `send()` call isn't working, when it works it should 
navigate us to the `/sign-in` page. You will see the 
button handler being called and working b/c you see 
the handler logging:
![console image](./asset/console.png)
