#include <napi.h>
#include <windows.h>
#include <mmsystem.h>

// Function to set timer resolution to 1ms
Napi::Value SetTimerResolution(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    MMRESULT result = timeBeginPeriod(1);

    return Napi::Boolean::New(env, (result == TIMERR_NOERROR));
}

// Function to reset timer resolution back to default
Napi::Value ResetTimerResolution(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    MMRESULT result = timeEndPeriod(1);

    return Napi::Boolean::New(env, (result == TIMERR_NOERROR));
}

// Initialize the module and export the functions
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "setTimerResolution"), Napi::Function::New(env, SetTimerResolution));
    exports.Set(Napi::String::New(env, "resetTimerResolution"), Napi::Function::New(env, ResetTimerResolution));
    return exports;
}

NODE_API_MODULE(timer_resolution, Init)