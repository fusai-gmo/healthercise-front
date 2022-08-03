<template>
  <header class="flex w-full items-center justify-between bg-bg px-4 py-3">
    <div class="flex w-max items-center space-x-2">
      <Logo class="fill-accent"></Logo>
      <h1 class="text-xl font-bold">
        <slot></slot>
      </h1>
    </div>
    <img
      src="https://img.benesse-cms.jp/pet-cat/item/image/normal/77061d41-6774-4eed-8a01-187aad5e5b45.jpg?w=1200&h=1090&resize_type=cover&resize_mode=force"
      alt=""
      class="h-8 w-8 rounded-full"
    />
  </header>
</template>
