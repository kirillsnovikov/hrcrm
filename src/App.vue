<template>
  <div id="app">
    <div class="dark-color">
      <s-link>Ссылка</s-link>
    </div>
    <s-badge :color="'white'" :type="'sausage'">Primary</s-badge>
  </div>
</template>

<script>
import SLink from 'Elements/Link/SLink';
import SBadge from 'Elements/Badge/SBadge';
export default {
  components: {
    SLink,
    SBadge
  }
};
</script>
