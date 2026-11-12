import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdSize, BannerAdPosition, type BannerAdOptions } from '@capacitor-community/admob';

/**
 * AdMob Service for FuelMate
 * Handles native Android/iOS Google AdMob banners & interstitials,
 * with graceful fallback for web previews.
 */

// Google official test Ad Unit IDs (guaranteed to always serve test ads safely)
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111'; // Android Banner test ID
const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712'; // Android Interstitial test ID

let isAdMobInitialized = false;

export async function initializeAdMob(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('[AdMob] Running in web environment, using responsive UI banner simulation.');
    return;
  }

  try {
    if (!isAdMobInitialized) {
      await AdMob.initialize({
        testingDevices: ['EMULATOR'],
        initializeForTesting: true,
      });
      isAdMobInitialized = true;
      console.log('[AdMob] Native AdMob initialized successfully.');
    }
  } catch (error) {
    console.warn('[AdMob] Initialization warning:', error);
  }
}

export async function showBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await initializeAdMob();
    const options: BannerAdOptions = {
      adId: TEST_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };
    await AdMob.showBanner(options);
    console.log('[AdMob] Native Banner displayed at bottom.');
  } catch (error) {
    console.warn('[AdMob] Show banner failed:', error);
  }
}

export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.warn('[AdMob] Hide banner failed:', error);
  }
}

export async function showInterstitialAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await initializeAdMob();
    await AdMob.prepareInterstitial({
      adId: TEST_INTERSTITIAL_ID,
      isTesting: true,
    });
    await AdMob.showInterstitial();
  } catch (error) {
    console.warn('[AdMob] Interstitial failed:', error);
  }
}

// 3-minute minimum cooldown between interstitial ads
const INTERSTITIAL_COOLDOWN_MS = 3 * 60 * 1000;
let lastInterstitialTimestamp = 0;

/**
 * Triggers a 5s skippable Interstitial Ad on calculation (Step 2 -> Step 3),
 * strictly throttled by a 3-minute cooldown to avoid disturbing the user.
 */
export async function showCalculationInterstitialAd(): Promise<void> {
  const now = Date.now();
  if (lastInterstitialTimestamp !== 0 && now - lastInterstitialTimestamp < INTERSTITIAL_COOLDOWN_MS) {
    const remainingSecs = Math.round((INTERSTITIAL_COOLDOWN_MS - (now - lastInterstitialTimestamp)) / 1000);
    console.log(`[AdMob] Interstitial skipped: 3-min cooldown active (${remainingSecs}s remaining).`);
    return;
  }

  lastInterstitialTimestamp = now;

  if (!Capacitor.isNativePlatform()) {
    console.log('[AdMob] Web preview: 3-minute interstitial triggered.');
    return;
  }

  try {
    await initializeAdMob();
    await AdMob.prepareInterstitial({
      adId: TEST_INTERSTITIAL_ID,
      isTesting: true,
    });
    await AdMob.showInterstitial();
    console.log('[AdMob] Native Interstitial displayed successfully.');
  } catch (error) {
    console.warn('[AdMob] Interstitial failed gracefully:', error);
  }
}
