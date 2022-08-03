<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="flex w-full flex-col items-center space-y-16">
      <div class="mr-3 flex flex-row items-center">
        <Logo class="h-12 w-12 fill-accent"></Logo>
        <h1 class="mt-1 text-3xl font-bold leading-none">ヘルササイズ</h1>
      </div>
      <Button
        @click="googleLogin()"
        class="relative w-[300px] rounded-full border border-gray-300 bg-white px-5 py-3 text-center font-bold"
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
    </div>
  </div>
</template>

<script setup>
  import  { signInWithPopup } from 'firebase/auth';
  definePageMeta({
    layout: false,
  })
  const { $auth,$provider,$store } = useNuxtApp();
  const router = useRouter()
  const googleLogin = (() => {
    $provider.addScope('https://www.googleapis.com/auth/calendar');
     signInWithPopup($auth ,$provider)
        .then((response) => {
          let Authorization = useAuthorization();
          Authorization.value = response["_tokenResponse"]['idToken'];
          console.log(Authorization);
          router.push("/")
        })
        .catch((error) => {
          alert(error);
          alert("エラーが発生いたしました。間違い等がないか確認をし再度実施をお願いします");
        });
  });


</script>
