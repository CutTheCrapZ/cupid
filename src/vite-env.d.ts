/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_NODE_ENV: string;//定义提示信息 数据是只读的无法被修改
}
declare module '*.js';
declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
