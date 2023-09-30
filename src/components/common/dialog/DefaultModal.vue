<template>
  <v-dialog v-model="show" width="auto" persistent>
    <v-card width="800px">
      <v-card-title>
        <v-list-item class="w-100">
          <template #prepend>
            <v-avatar color="grey-lighten-3" @click="closeModal(false)">
              <v-icon icon="mdi-arrow-left"></v-icon>
            </v-avatar>
          </template>

          <v-list-item-title class="text-h6 py-3">
            {{ modalItem.title }}
          </v-list-item-title>
          <template #append>
            <slot name="card-append"></slot>
          </template>
        </v-list-item>
      </v-card-title>
      <v-card-item>
        <component :is="modalItem.component" v-if="modalItem.propData !== null" :model="modalItem.propData"
          @confirm="confirmItem" />
        <component :is="modalItem.component" v-else @confirm="confirmItem" />
      </v-card-item>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn color="primaryDeep" @click="closeModal(false)">Close</v-btn>
        <v-btn color="primaryDeep" @click="closeModal(false)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'ModalComponent',
  emits: ['close', 'confirm'],
  props: {
    modalItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    closeModal(val: boolean) {
      this.show = val
      this.$emit('close', val)
    },
    confirmItem(item: Record<string, any>) {
      this.$emit('confirm', item)
    }
  },
}
</script>

<style lang="scss" scoped></style>