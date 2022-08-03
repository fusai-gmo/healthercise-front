<template>
  <div class="overflow-hidden">
    <div class="sticky top-0 z-10 flex flex-row items-center bg-bg px-1">
      <div class="shrink-0">
        <slot name="back"></slot>
      </div>
      <Header>
        <slot name="title"></slot>
      </Header>
    </div>
    <article class="mx-auto max-w-5xl p-4">
      <slot />
    </article>
  </div>
</template>
