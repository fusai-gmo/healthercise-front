<template>
  <div>
    <header class="sticky top-0 z-10 flex flex-row items-center bg-bg px-1">
      <div class="shrink-0">
        <slot name="back"></slot>
      </div>
      <Header is="div">
        <slot name="title"></slot>
      </Header>
    </header>
    <article class="mx-auto max-w-5xl p-4">
      <slot />
    </article>
  </div>
</template>
