<!--  -->
<template>
    <div>
        <div class="content content-intro">
            <div class="content-inner" style="background: unset;"><canvas id="background" width="2560"
                    height="1291"></canvas>
                <div class="wrap fade in">
                    <!-- github -->
                    <!-- <a class="github-corner" href="https://github.com/Tomotoes/HomePage"
						aria-label="View source on GitHub" target="_blank" rel="noopener noreferrer"><svg width="80"
							height="80" viewBox="0 0 250 250"
							style="fill:transparent; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
							aria-hidden="true">
							<path d="M0 0 115 115 130 115 142 142 250 250 250 0Z"></path>
							<path class="octo-arm"
								d="M128.3 109C113.8 99.7 119 89.6 119 89.6 122 82.7 120.5 78.6 120.5 78.6 119.2 72 123.4 76.3 123.4 76.3 127.3 80.9 125.5 87.3 125.5 87.3 122.9 97.6 130.6 101.9 134.4 103.2"
								fill="currentColor" style="transform-origin: 130px 106px;"></path>
							<path class="octo-body"
								d="M115 115C114.9 115.1 118.7 116.5 119.8 115.4L133.7 101.6C136.9 99.2 139.9 98.4 142.2 98.6 133.8 88 127.5 74.4 143.8 58 148.5 53.4 154 51.2 159.7 51 160.3 49.4 163.2 43.6 171.4 40.1 171.4 40.1 176.1 42.5 178.8 56.2 183.1 58.6 187.2 61.8 190.9 65.4 194.5 69 197.7 73.2 200.1 77.6 213.8 80.2 216.3 84.9 216.3 84.9 212.7 93.1 206.9 96 205.4 96.6 205.1 102.4 203 107.8 198.3 112.5 181.9 128.9 168.3 122.5 157.7 114.1 157.9 116.9 156.7 120.9 152.7 124.9L141 136.5C139.8 137.7 141.6 141.9 141.8 141.8Z"
								fill="currentColor"></path>
						</svg></a> -->
                    <h2 class="content-title">Song</h2>
                    <h3 class="content-subtitle" original-content="Front engineer">
                        <span>F</span><span>r</span><span>o</span><span>n</span><span>t</span><span>
                        </span><span>e</span><span>n</span><span>g</span><span>i</span><span>n</span><span>e</span><span>e</span><span>r</span>
                    </h3><a class="enter">enter</a>
                    <div class="arrow arrow-1"></div>
                    <div class="arrow arrow-2"></div>
                </div>
            </div>
            <div class="shape-wrap"><svg class="shape" width="100%" height="100vh" preserveAspectRatio="none"
                    viewBox="0 0 1440 800" xmlns:pathdata="http://www.codrops.com/" style="fill: rgb(30, 31, 33);">
                    <path
                        d="M-44-50C-52.71 28.52 15.86 8.186 184 14.69 383.3 22.39 462.5 12.58 638 14 835.5 15.6 987 6.4 1194 13.86 1661 30.68 1652-36.74 1582-140.1 1512-243.5 15.88-589.5-44-50Z"
                        pathdata:id="M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z">
                    </path>
                </svg></div>
        </div>
        <div class="content content-main">
            <div id="card">
                <div class="card-inner fade">
                    <header><img src="@/assets/avatar.jpg" style="width: 5rem;height: 5rem;" alt="avatar">
                        <h1 data-translate="name">Song</h1>
                        <h2 id="signature" data-translate="signature">Code &amp; Input &amp; Output</h2>
                    </header>
                    <ul>
                        <li><a @click="topage('blog')" aria-label="Blog"><i class="icon icon-bokeyuan"></i><span
                                    data-translate="Blog">Blog</span></a></li>
                        <li><a @click="topage('about')" aria-label="About"><i class="icon icon-other"></i><span
                                    data-translate="About">About</span></a></li>
                        <li><a @click="topage('style')" aria-label="Style"><i class="icon icon-xiaolian"></i><span
                                    data-translate="Style">Style</span></a></li>
                        <li v-if="store.token"><a @click="topage('think')" aria-label="Think"><i
                                    class="icon icon-idea"></i><span data-translate="Think">Think</span></a></li>
                        <li><a href="mailto:e23e23biu@163.com" aria-label="Email" target="_blank"><i
                                    class="icon icon-email"></i><span data-translate="Email">Email</span></a></li>
                        <li><a href="javascript:();" aria-label="Github" target="_blank"><i
                                    class="icon icon-github"></i><span data-translate="Github">Github</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from "@/store";
import { background } from "@/utils/background.js";
import { main } from "@/utils/main.js";
import { searchToken, uploadToken, getToken, checkToken } from "@/api/oneDrive";
import { refreshT } from "@/utils/oneDrive";
// import { refreshT } from "@/utils/oneDrive";
const store = useStore();
const getT = async () => {
    let res = await getToken()
    if (res.code === 200) {
        res.data.access_token && localStorage.setItem("access_token", res.data.access_token)
        res.data.refresh_token && localStorage.setItem("refresh_token", res.data.refresh_token)
        res.data.token_type && localStorage.setItem("token_type", res.data.token_type)
        // refreshToken()
        try {
            await checkToken()
        } catch (error) {
            refreshT(res.data.refresh_token)
        }
    }
}
const judgeUrl = async () => {
    const paramsStr = window.location.search
    const params = new URLSearchParams(paramsStr)
    let code = params.get('code') // list
    if (code) {
        //首页做url判断，存在code则请求token
        let res = await searchToken(code as string)
        if (res.code == 200) {
            let onedrive = JSON.parse(res.data.body)
            onedrive.access_token && localStorage.setItem("access_token", onedrive.access_token)
            onedrive.refresh_token && localStorage.setItem("refresh_token", onedrive.refresh_token)
            onedrive.token_type && localStorage.setItem("token_type", onedrive.token_type)
            let r = await uploadToken(onedrive)
        }
    } else {
        getT()
    }
}

onMounted(async () => {
    judgeUrl()
    import('@/utils/anime.js').then(res => {
        main()
        background()
    })
})

const router = useRouter()
const topage = (page: string) => {
    router.push(page)
}
</script>
<style lang='scss'>
@import '../assets/style/homeStyle';
@import '@/assets/style/animation/transition.scss';

.github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {

    0%,
    100% {
        transform: rotate(0)
    }

    20%,
    60% {
        transform: rotate(-25deg)
    }

    40%,
    80% {
        transform: rotate(10deg)
    }
}

@media (max-width:500px) {
    .github-corner:hover .octo-arm {
        animation: none
    }

    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }
}
</style>