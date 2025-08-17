To run the image generation feature, you need to provide your Fal API key.

1.  Create a new file named `.env` in the root of the project.
2.  Add the following line to the `.env` file, replacing `"your-fal-key-here"` with your actual key:

```
VITE_APP_FAL_KEY="your-fal-key-here"
```

The application is configured to load this key for making API requests to the image generation endpoint. 