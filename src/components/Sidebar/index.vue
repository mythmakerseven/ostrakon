<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { Tabs as TabsEnum } from '../../types'
import PageTitle from '../PageTitle.vue'
import Credits from './Credits.vue'
import Imports from './Imports/index.vue'
import Info from './Info.vue'
import Options from './Options/index.vue'
import SearchBox from './SearchBox/index.vue'
import Tabs from './Tabs.vue'

const tabs: TabsEnum[] = [
  TabsEnum.AddItems,
  TabsEnum.Options,
  TabsEnum.ImportsExports,
  TabsEnum.Info,
]

const currentTab: Ref<TabsEnum> = ref(TabsEnum.AddItems)

function setCurrentTab(tab: TabsEnum) {
  currentTab.value = tab
}
</script>

<template>
  <div class="sidebar-container">
    <Tabs
      :tabs="tabs"
      :current-tab="currentTab"
      class="mobile-tabs"
      @set-current-tab="setCurrentTab"
    />
    <div class="sidebar">
      <div class="sidebar-block title-block">
        <PageTitle />
      </div>
      <div class="tabbed-sidebar-block">
        <Tabs
          :tabs="tabs"
          :current-tab="currentTab"
          class="desktop-tabs"
          @set-current-tab="setCurrentTab"
        />
        <div class="sidebar-content">
          <SearchBox v-if="currentTab === TabsEnum.AddItems" />
          <Options v-else-if="currentTab === TabsEnum.Options" />
          <Imports v-else-if="currentTab === TabsEnum.ImportsExports" />
          <Info v-else-if="currentTab === TabsEnum.Info" />
          <div
            v-if="currentTab === TabsEnum.AddItems || currentTab === TabsEnum.Info"
            class="sidebar-block mobile-credits-block"
          >
            <Credits />
          </div>
        </div>
      </div>
      <div class="sidebar-block desktop-credits-block">
        <Credits />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  width: 400px;
}

.mobile-credits-block {
  display: none;
}

.mobile-tabs {
  display: none;
}

.sidebar-block {
  margin: 10px;
  width: 100%;
  background: rgba(20, 20, 20, 0.8);
  border-radius: 6px;
  text-align: center;
  padding: 10px;
}

.tabbed-sidebar-block {
  margin: 10px;
  width: 100%;
  text-align: center;
}

.sidebar-content {
  text-align: left;
  max-height: 480px;
  overflow-y: auto;
  background: rgba(20, 20, 20, 0.8);
  border-radius: 0 6px 6px 6px;
  padding: 16px;
}

@media screen and (max-width: 1000px) {
  .title-block {
    display: none;
  }

  .sidebar {
    height: 50dvh;
    max-height: 50dvh;
    background: #000000;
    z-index: 1;
    position: absolute;
    width: 100%;
  }

  .sidebar-block {
    width: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px 0;
    max-height: 100%;
  }

  .sidebar-content {
    max-height: 100%;
    border-radius: 0;
    background: #000000;
  }

  .tabbed-sidebar-block {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .desktop-credits-block {
    display: none;
  }

  .mobile-credits-block {
    display: initial;
  }

  .mobile-tabs {
    display: flex;
  }

  .desktop-tabs {
    display: none;
  }
}
</style>
