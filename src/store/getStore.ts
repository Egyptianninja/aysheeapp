import { store } from './';

export const user = () => store.getState().user;
export const languageName = () => store.getState().glob.languageName;
export const isRTL = () => store.getState().glob.isRTL;

export const category = () => store.getState().glob.language.category;
export const kind = () => store.getState().glob.language.kind;
export const realestate = () => store.getState().glob.language.realestate;
export const service = () => store.getState().glob.language.service;
export const electroBrands = () => store.getState().glob.language.electroBrands;
export const menu = () => store.getState().glob.language.menu;
export const words = () => store.getState().glob.language.words;
export const post = () => store.getState().glob.language.post;

export const brands = () => store.getState().glob.brands;
export const subBrands = () => store.getState().glob.subBrands;
export const buckets = () => store.getState().post.buckets;
