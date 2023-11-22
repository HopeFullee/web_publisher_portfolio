import * as THREE from "./three.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";






class Milkyway {
    constructor() {
        const milkywayContainer = document.querySelector(".milky-way");
        this._milkywayContainer = milkywayContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        milkywayContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;
        
        const loadingManger = new THREE.LoadingManager( ()=> {

            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('fade-out');

            loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
        })

        this._loadingManager = loadingManger;


        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

        function onTransitionEnd(e) {
            e.target.remove();
        }
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._milkywayContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = -0.3;

        orbit.minDistance = 50;
        orbit.maxDistance = 1000;

        this._orbit = orbit;
    }
    
    _setupModel() {
        const gltfLoader = new GLTFLoader(this._loadingManager);

        gltfLoader.load(
            '../pf_planetarium/model/milkyway/milkyway.gltf',
            (gltf) => {                
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;

                this._scene.add(gltf.scene);
            }
        );
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            25, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );
        
        camera.position.y = 300;
        camera.position.z = 400;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        
        const light = new THREE.AmbientLight(color, intensity);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._milkywayContainer.clientWidth;
        const height = this._milkywayContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }

    
}










class Sun {
    constructor() {
        const sunContainer = document.querySelector(".sun");
        this._sunContainer = sunContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        sunContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._sunContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = -0.3;

        orbit.minDistance = 55;
        orbit.maxDistance = 1000;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/sun/sun.gltf',
            (gltf) => {
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;

                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        texture.encoding = THREE.sRGBEncoding;
 
        this._scene.background = texture;

        const geometry = new THREE.SphereGeometry( 22.5, 64, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xEE4B2B, transparent: true, opacity: 0.3, side: THREE.BackSide } );
        const sphere = new THREE.Mesh( geometry, material );
        
        this._scene.add( sphere );
    }


    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 100;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;

        const light = new THREE.AmbientLight(color, intensity);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._sunContainer.clientWidth;
        const height = this._sunContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }

}











class Mercury {
    constructor() {
        const mercuryContainer = document.querySelector(".mercury");
        this._mercuryContainer = mercuryContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        mercuryContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._mercuryContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 250;
        orbit.maxDistance = 4000;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/mercury/mercury.gltf',
            (gltf) => {
                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);
 
        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 450;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(300, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._mercuryContainer.clientWidth;
        const height = this._mercuryContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Venus {
    constructor() {
        const venusContainer = document.querySelector(".venus");
        this._venusContainer = venusContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        venusContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._venusContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 2.5;
        orbit.maxDistance = 40;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load(
            '../pf_planetarium/model/venus/venus.gltf',
            (gltf) => {
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;
                
                this._scene.add(gltf.scene);
            }
        );          

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        texture.encoding = THREE.sRGBEncoding;
 
        this._scene.background = texture;

    }

    
    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 4.5;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 0.8;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(3, 0, 0);
      
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);
        
        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._venusContainer.clientWidth;
        const height = this._venusContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}








class Earth {
    constructor() {
        const earthContainer = document.querySelector(".earth");
        this._earthContainer = earthContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        earthContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._setupAtmosphere();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._earthContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 25;
        orbit.maxDistance = 400;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load(
            '../pf_planetarium/model/earth/earth.gltf',
            (gltf) => {
                gltf.scene.scale.multiplyScalar(10 / 100);
                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        this._scene.background = texture;

        const geometry = new THREE.SphereGeometry( 10.2, 64, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0x87ceeb, transparent: true, opacity: 0.3, side: THREE.BackSide } );
        const sphere = new THREE.Mesh( geometry, material );
        
        this._scene.add( sphere );
    }


    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );

        camera.position.z = 45;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(25, 2, 4);
        this._camera.add(light);
    }

    _setupAtmosphere() {
        const geometry = new THREE.SphereBufferGeometry( 1500, 3200, 1600 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const sphere = new THREE.Mesh( geometry, material );
        this._scene.add( sphere );
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._earthContainer.clientWidth;
        const height = this._earthContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Mars {
    constructor() {
        const marsContainer = document.querySelector(".mars");
        this._marsContainer = marsContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        marsContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._marsContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 250;
        orbit.maxDistance = 4000;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/mars/mars.gltf',
            (gltf) => {
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;
                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        texture.encoding = THREE.sRGBEncoding;

        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 450;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xFFFFFF;
        const intensity = 0.8;
        
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(300, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._marsContainer.clientWidth;
        const height = this._marsContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Jupiter {
    constructor() {
        const jupiterContainer = document.querySelector(".jupiter");
        this._jupiterContainer = jupiterContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        jupiterContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._jupiterContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 250;
        orbit.maxDistance = 4000;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/jupiter/jupiter.gltf',
            (gltf) => {
                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 450;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1.5;
        
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(300, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._jupiterContainer.clientWidth;
        const height = this._jupiterContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Saturn {
    constructor() {
        const saturnContainer = document.querySelector(".saturn");
        this._saturnContainer = saturnContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        saturnContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._saturnContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 475;
        orbit.maxDistance = 7800;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/saturn/saturn.gltf',
            (gltf) => {
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;

                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        texture.encoding = THREE.sRGBEncoding;

        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.y = 200;
        camera.position.z = 850;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 0.6;
        
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(600, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._saturnContainer.clientWidth;
        const height = this._saturnContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Uranus {
    constructor() {
        const uranusContainer = document.querySelector(".uranus");
        this._uranusContainer = uranusContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        uranusContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._uranusContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 575;
        orbit.maxDistance = 8500;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/uranus/uranus.gltf',
            (gltf) => {
                this._renderer.outputEncoding = THREE.sRGBEncoding;
                this._renderer.gammaFactor = 2.2;

                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        texture.encoding = THREE.sRGBEncoding;

        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.y = 200;
        camera.position.z = 1000;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1.5;
        
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(700, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._uranusContainer.clientWidth;
        const height = this._uranusContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}










class Neptune {
    constructor() {
        const neptuneContainer = document.querySelector(".neptune");
        this._neptuneContainer = neptuneContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        neptuneContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        let orbit = new OrbitControls(this._camera, this._neptuneContainer);
        orbit.autoRotate = true;
        orbit.autoRotateSpeed = 0.3;

        orbit.minDistance = 475;
        orbit.maxDistance = 7000;

        this._orbit = orbit;
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        
        gltfLoader.load(
            '../pf_planetarium/model/neptune/neptune.gltf',
            (gltf) => {
                this._scene.add(gltf.scene);
            }
        );

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
             '../pf_planetarium/assets/corona_ft.png',    
             '../pf_planetarium/assets/corona_bk.png',    
             '../pf_planetarium/assets/corona_up.png',    
             '../pf_planetarium/assets/corona_dn.png',    
             '../pf_planetarium/assets/corona_rt.png',    
             '../pf_planetarium/assets/corona_lf.png',    
        ]);

        this._scene.background = texture;
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            50, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );

        camera.position.z = 850;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 2;
        
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(600, 2, 4);
        this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        this._orbit.update();
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._neptuneContainer.clientWidth;
        const height = this._neptuneContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}








window.onload = function () {
    new Milkyway();
    new Sun();
    new Mercury();
    new Venus();
    new Earth();
    new Mars();
    new Jupiter();
    new Saturn();
    new Uranus();
    new Neptune();
}





