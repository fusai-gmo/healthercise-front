<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="flex w-full flex-col items-center space-y-16">
      <div class="mr-3 flex flex-row items-center">
        <Logo class="h-12 w-12 fill-accent"></Logo>
        <h1 class="mt-1 text-3xl font-bold leading-none">ヘルササイズ</h1>
      </div>
      <Button
        @click="() => googleLogin()"
        class="relative w-[300px] rounded-full border border-gray-300 bg-white px-5 py-3 text-center font-bold transition-all hover:bg-gray-50"
      >
        <img
          src="assets/images/google_logo.png"
          class="absolute left-2 top-1/2 -translate-y-1/2"
          alt=""
          width="32"
          height="32"
        />
        <span> ログイン </span>
      </Button>
      <!-- <div
        id="g_id_onload"
        data-client_id="671996679896-nqj912dcsbeoitmgtrvscv6am5uck3tg.apps.googleusercontent.com"
        data-login_uri="http://localhost:3000/login"
      ></div>
      <div
        class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      >
        ログイン
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: false,
  })

  const authUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    `scope=${encodeURIComponent(
      'openid https://www.googleapis.com/auth/calendar'
    )}&` +
    'access_type=offline&' +
    'include_granted_scopes=true&' +
    `response_type=${encodeURIComponent('code')}&` +
    // "state=state_parameter_passthrough_value&" +
    `redirect_uri=${encodeURIComponent('http://localhost/auth/callback')}&` +
    `client_id=${encodeURIComponent(
      '671996679896-nqj912dcsbeoitmgtrvscv6am5uck3tg.apps.googleusercontent.com'
    )}`

  console.log(authUrl)

  const googleLogin = async () => {
    window.location.href = authUrl
  }
</script>
