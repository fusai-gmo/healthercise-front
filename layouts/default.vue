<template>
  <div>
    <Header class="sticky top-0 z-10">
      <slot name="title"></slot>
    </Header>
    <article class="mx-auto max-w-5xl p-4">
      <slot />
    </article>
  </div>
</template>
