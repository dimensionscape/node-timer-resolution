{
  "targets": [
    {
      "target_name": "timer_resolution",
      "sources": ["src/timer_resolution.cpp"],
      "include_dirs": [
        "node_modules/node-addon-api",
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      "libraries": [
        "-lwinmm"
      ],
      "defines": ["NAPI_CPP_EXCEPTIONS"]
    }
  ]
}