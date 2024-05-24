<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-content :fullscreen="true">
          <ion-grid>
              <ion-row>
                  <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
                      <ion-img :src="photo.webviewPath"></ion-img>
                  </ion-col>
              </ion-row>
          </ion-grid>
          <ion-fab vertical="bottom" horizontal="center" slot="fixed">
              <ion-fab-button @click="takePhoto()">
                  <ion-icon :icon="camera"></ion-icon>
              </ion-fab-button>
          </ion-fab>
      </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import {
    IonPage,
    IonHeader,
    IonFab,
    IonFabButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
} from '@ionic/vue';

import { NativeBiometric } from "capacitor-native-biometric";

NativeBiometric.isAvailable().then(async (result) => {
    if(!result.isAvailable) return;

    const verified = await NativeBiometric.verifyIdentity({
        reason: "For easy log in",
        title: "Log in",
        subtitle: "Maybe add subtitle here?",
        description: "Maybe a description too?",
    })
        .then(() => true)
        .catch(() => false);

    if(!verified) return;
})

const { photos, takePhoto } = usePhotoGallery();

</script>
