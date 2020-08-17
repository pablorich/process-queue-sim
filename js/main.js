//pilas
programasNuevos = [];
programasListos = [];
programasBloqueados = [];
programasTerminados = [];
total = 1;
//cajas
nuevos = document.getElementById("nuevos");
lista = document.getElementById("lista");
ejecutando = document.getElementById("ejecutando");
bloqueados = document.getElementById("bloqueados");
progTerminados = document.getElementById("progTerminados");
tablaProcCont = document.getElementById("tablaProcCont");
divContenedor = document.getElementById("cajaMemoria");
//titulos
estado = document.getElementById("estado");
tGlobal = document.getElementById("tGlobal");
quantumValue = document.getElementById("quantumValue");

//clases
class Contenedor{
    constructor(tam){
        this.tamaño = tam;
        this.lista = new Array(tam);
        for (var i = 0; i < this.lista.length; i++) {
            this.lista[i] = {
                id:0,
                state: "vacio",
                celda1:0,
                celda2:0,
                celda3:0,
                celda4:0
            };
        }
    }
    load(memoria, estadoProg, idProg){
        let ans = [];
        if (this.marcosDisponibles() >= (memoria/4)) {
            let marcos = memoria/4;
            let residuo = memoria%4;
            for (var i = 0; i < Math.floor(marcos); i++) {
                ans.push(this.loadPage(this.firstEmptyFrame(),4,estadoProg,idProg));
            }
            if (residuo > 0) {
                ans.push(this.loadPage(this.firstEmptyFrame(),residuo,estadoProg,idProg));
            }
            return ans;
        }
        else {
            let parag = document.createElement("p");
            parag.innerHTML = "Se intento cargar programa en la memoria pero no habia suficiente espacio";
            divContenedor.appendChild(parag);
            return ans;
        }
    }
    changeState(frameArray, newState){
        for (var i = 0; i < frameArray.length; i++) {
            console.log(frameArray[i], newState);
            this.changeFrameState(frameArray[i], newState);
        }
    }
    changeFrameState(index, newState){
        if (index >= 0 && index < 35) {
            this.lista[index].state = newState;
        }
    }
    firstEmptyFrame(){
        for (var i = 0; i < this.lista.length; i++) {
            if (this.lista[i].state == "vacio") {
                return i;
            }
        }
        return -1;
    }
    loadPage(index, size, estadoProg, idProg){
        if (index >= 0 && index < 35) {
            this.lista[index].state = estadoProg;
            this.lista[index].id = idProg;
            if (size == 4) {
                this.lista[index].celda1 = 1;
                this.lista[index].celda2 = 1;
                this.lista[index].celda3 = 1;
                this.lista[index].celda4 = 1;
            }
            else if (size == 3) {
                this.lista[index].celda1 = 1;
                this.lista[index].celda2 = 1;
                this.lista[index].celda3 = 1;
                this.lista[index].celda4 = 0;
            }
            else if (size == 2) {
                this.lista[index].celda1 = 1;
                this.lista[index].celda2 = 1;
                this.lista[index].celda3 = 0;
                this.lista[index].celda4 = 0;
            }
            else if (size == 1) {
                this.lista[index].celda1 = 1;
                this.lista[index].celda2 = 0;
                this.lista[index].celda3 = 0;
                this.lista[index].celda4 = 0;
            }
            else {
                this.lista[index].celda1 = 0;
                this.lista[index].celda2 = 0;
                this.lista[index].celda3 = 0;
                this.lista[index].celda4 = 0;
            }
            return index;
        }
        else {
            let parag = document.createElement("p");
            parag.innerHTML = "Se intento cargar pagina en un marco pero no habian marcos";
            divContenedor.appendChild(parag);
            return -1;
        }
    }
    freeProgram(frameArray){
        for (var i = 0; i < frameArray.length; i++) {
            this.freePage(frameArray[i]);
        }
    }
    freePage(index){
        if (index >= 0 && index < 35) {
            this.lista[index].id = 0;
            this.lista[index].state = "vacio";
            this.lista[index].celda1 = 0;
            this.lista[index].celda2 = 0;
            this.lista[index].celda3 = 0;
            this.lista[index].celda4 = 0;
        }
    }
    getAllMarcosDisponibles(){
        let ans = [];
        for (var i = 0; i < this.lista.length; i++) {
            if (this.lista[i].state == "vacio") {
                ans.push(i);
            }
        }
        return ans;
    }
    marcosDisponibles(){
        let cantidad = 0;
        for (var i = 0; i < this.lista.length; i++) {
            if (this.lista[i].state == "vacio") {
                cantidad++;
            }
        }
        return cantidad;
    }
    draw(){
        this.delete();
        for (var i = 0; i < this.lista.length; i++) {
            let marco = document.createElement("div");
            let espacios = document.createElement("div");
            let parag = document.createElement("p");
            parag.innerHTML = i;
            espacios.classList.add("marcoContenido");
            let tipo = this.lista[i].state;
            let celda1 = document.createElement("div");
            let celda2 = document.createElement("div");
            let celda3 = document.createElement("div");
            let celda4 = document.createElement("div");

            if (tipo == "vacio") {
                celda1.classList.add("vacio");
                celda2.classList.add("vacio");
                celda3.classList.add("vacio");
                celda4.classList.add("vacio");
            }
            else {
                if (this.lista[i].celda1 == 1) {
                    celda1.classList.add(tipo);
                    if (this.lista[i].celda2 == 1) {
                        celda2.classList.add(tipo);
                        if (this.lista[i].celda3 == 1) {
                            celda3.classList.add(tipo);
                            if (this.lista[i].celda4 == 1) {
                                celda4.classList.add(tipo);
                            }
                        }
                    }
                }
            }


            espacios.appendChild(celda1);
            espacios.appendChild(celda2);
            espacios.appendChild(celda3);
            espacios.appendChild(celda4);

            marco.appendChild(parag);
            marco.appendChild(espacios);
            marco.classList.add("marco");
            divContenedor.appendChild(marco);
        }
    }
    delete(){
        while (divContenedor.firstChild) {
            divContenedor.removeChild(divContenedor.firstChild);
        }
    }
}
var contenedor = new Contenedor(35);
//variables

document.getElementById("agregar").addEventListener("click", function(){
    document.getElementById('errores').innerHTML = "";
    let cantidad = Number(document.getElementById("cantidad").value);
    document.getElementById("cantidad").value='';
    agregaProgramas(cantidad);
})

function agregaProgramas(cantidad){
    for (var i = 0; i < cantidad; i++) {
        let opNum = getRndInteger(1,7);
        switch (opNum) {
            case 1:
            operador = '+';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            break;
            case 2:
            operador = '-';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            break;
            case 3:
            operador = '*';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            break;
            case 4:
            operador = '/';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            if (num_2 == 0) {
                num_2++;
            }
            break;
            case 5:
            operador = '%';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            if (num_2 == 0) {
                num_2++;
            }
            break;
            case 6:
            operador = 'sqrt';
            num_1 = getRndInteger(1,10000);
            num_2 = getRndInteger(-100,100);
            break;
            case 7:
            operador = 'porc';
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
            break;
            default:
            operador = "error";
            num_1 = getRndInteger(-10000,10000);
            num_2 = getRndInteger(-10000,10000);
        }
        let tiempo = getRndInteger(5,15);
        let memSpace = getRndInteger(8,30);
        let identificador = total;
        total++;

        let prog = {
            operacion: operador,
            num_a: num_1,
            num_b: num_2,
            tiempo: tiempo,
            id: identificador,
            interrumpido: false,
            memSpace: memSpace,
            suspendido: false
        }

        programasNuevos.push(prog);

        switch (prog.operacion) {
            case "+":
            operacion = "Operacion: " + prog.num_a + ' + ' + prog.num_b;
            break;
            case "-":
            operacion = "Operacion: " + prog.num_a + ' - ' + prog.num_b;
            break;
            case "*":
            operacion = "Operacion: " + prog.num_a + ' * ' + prog.num_b;
            break;
            case "/":
            operacion = "Operacion: " + prog.num_a + ' / ' + prog.num_b;
            break;
            case "%":
            operacion = "Operacion: residuo de " + prog.num_a + ' / ' + prog.num_b;
            break;
            case "sqrt":
            operacion = "Operacion: &radic;" + prog.num_a;
            break;
            case "porc":
            operacion = "Operacion: " + prog.num_a + ' por ciento de ' + prog.num_b;
            break;
            default:
            operacion = "error";
        }

        addProgramaNuevo(identificador, tiempo, operacion, memSpace);
        estado.innerHTML = (programasNuevos.length);
    }
    if (cantidad < 0) {
        document.getElementById('errores').innerHTML = "La cantidad de programas no puede ser menor a 0";
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getNextPrograma(){//Jala el siguiente programa en memoria
    if (programasListos.length === 0 && programasBloqueados.length === 0) {
        prog = {
            tiempo: 0
        }
        return prog;
    }
    else if (programasListos.length === 0) {//Hay programas bloqueados
        prog = {
            tiempo: -1
        }
        return prog;
    }
    if(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    contenedor.changeState(programasListos[0].paginas, "ejecutando");
    return programasListos.shift();
}

function addToDone(prog, err){
    if(prog.tiempo != 0){
        let doneID = document.createElement("p");
        let doneOP = document.createElement("p");
        let res;
        doneID.innerHTML = "ID: " + prog.id;
        switch (prog.operacion) {
            case "+":
            res = Number(prog.num_a) + Number(prog.num_b);
            doneOP.innerHTML = "Operacion: " + prog.num_a + ' + ' + prog.num_b;
            break;
            case "-":
            res = Number(prog.num_a) - Number(prog.num_b);
            doneOP.innerHTML = "Operacion: " + prog.num_a + ' - ' + prog.num_b;
            break;
            case "*":
            res = Number(prog.num_a) * Number(prog.num_b);
            doneOP.innerHTML = "Operacion: " + prog.num_a + ' * ' + prog.num_b;
            break;
            case "/":
            res = Number(prog.num_a) / Number(prog.num_b);
            doneOP.innerHTML = "Operacion: " + prog.num_a + ' / ' + prog.num_b;
            break;
            case "%":
            res = Number(prog.num_a) % Number(prog.num_b);
            doneOP.innerHTML = "Operacion: residuo de " + prog.num_a + ' / ' + prog.num_b;
            break;
            case "sqrt":
            res = Math.sqrt(Number(prog.num_a))
            doneOP.innerHTML = "Operacion: &radic;" + prog.num_a;
            break;
            case "porc":
            res = Number(prog.num_a) * Number(prog.num_b)/100;
            doneOP.innerHTML = "Operacion: " + prog.num_a + ' por ciento de ' + prog.num_b;
            break;
            default:
            res = "error";
        }
        let doneRes = document.createElement("p");
        if (err) {
            doneRes.innerHTML = "Resultado: ERROR";
        }
        else {
            doneRes.innerHTML = "Resultado: " + res;
        }

        let doneItem = document.createElement("li");
        let doneTLLegada = document.createElement("p");
        let doneTFin = document.createElement("p");
        let doneTRet = document.createElement("p");
        let doneTResp = document.createElement("p");
        let doneTEspera = document.createElement("p");
        let doneTServicio = document.createElement("p");

        doneTLLegada.innerHTML = "Tiempo de llegada: " + prog.tLlegada;
        doneTFin.innerHTML = "Tiempo de finalización: " + prog.tFinalizacion;
        doneTRet.innerHTML = "Tiempo de retorno: " + prog.tRetorno;
        doneTResp.innerHTML = "Tiempo de respuesta: " + prog.tRespuesta;
        doneTEspera.innerHTML = "Tiempo de espera: " + prog.tEspera;
        doneTServicio.innerHTML = "Tiempo de servicio: " + prog.tServicio;

        doneItem.appendChild(doneID);
        doneItem.appendChild(doneOP);
        doneItem.appendChild(doneRes);
        doneItem.appendChild(doneTLLegada);
        doneItem.appendChild(doneTFin);
        doneItem.appendChild(doneTRet);
        doneItem.appendChild(doneTResp);
        doneItem.appendChild(doneTEspera);
        doneItem.appendChild(doneTServicio);

        progTerminados.appendChild(doneItem);
    }
    while (programasNuevos.length > 0) {
        let ans = contenedor.load(programasNuevos[0].memSpace, "cargado", programasNuevos[0].id);
        if (ans.length > 0) {
            nuevos.removeChild(nuevos.firstChild);
            temporal = programasNuevos.shift();
            temporal.tLlegada = timerGlobal;
            temporal.paginas = ans;
            addProgram(temporal.id, temporal.tiempo, temporal.tiempo);
            programasListos.push(temporal);
        }
        else {
            break;
        }
    }
    programaActual = getNextPrograma();
    estado.innerHTML = (programasNuevos.length);
}

document.getElementById("start").addEventListener("click", function(){
    document.getElementById('errores').innerHTML = "";
    quantum = Number(document.getElementById("quantum").value);
    if (quantum > 0) {
        emptyInput();
        document.getElementById("quantumValue").innerHTML = quantum;
        empezarEjecucion(quantum);
    }
    else {
        document.getElementById('errores').innerHTML = "El quantum no puede ser menor a 0";
    }
})

function empezarEjecucion(){
    //Prepara el html
    disableInput();
    campo2 = document.createElement("p");
    campo2.innerHTML = "Operacion: ";
    campo3 = document.createElement("p");
    campo3.innerHTML = "Tiempo Maximo Estimado: ";
    campo4 = document.createElement("p");
    campo4.innerHTML = "Tiempo Transcurrido: ";
    campo5 = document.createElement("p");
    campo5.innerHTML = "Tiempo Restante: ";
    campo6 = document.createElement("p");
    campo6.innerHTML = "ID: ";
    campo7 = document.createElement("p");
    campo7.innerHTML = "quantum: ";
    nuevo = document.createElement("div");

    nuevo.appendChild(campo2);
    nuevo.appendChild(campo3);
    nuevo.appendChild(campo6);
    nuevo.appendChild(campo4);
    nuevo.appendChild(campo5);
    nuevo.appendChild(campo7);
    ejecutando.appendChild(nuevo);

    //inicializa variables
    paused = false;
    processTableMode = false;
    timerGlobal = 0;
    tGlobal.innerHTML = timerGlobal;
    contenedor.load(12,"sistema",0);//Cant memoria, status del prog, id prog
    //Carga programas en programasListos
    while (programasNuevos.length > 0) {
        let ans = contenedor.load(programasNuevos[0].memSpace, "cargado", programasNuevos[0].id);
        if (ans.length > 0) {
            nuevos.removeChild(nuevos.firstChild);
            temporal = programasNuevos.shift();
            temporal.tLlegada = timerGlobal;
            temporal.paginas = ans;
            addProgram(temporal.id, temporal.tiempo, temporal.tiempo);
            programasListos.push(temporal);
        }
        else {
            break;
        }
    }
    estado.innerHTML = (programasNuevos.length);
    //Precargar primer programa
    programaActual = getNextPrograma();
    contenedor.draw();
    if (programaActual.tiempo !== 0) {
        timerLocal = programaActual.tiempo;
        timerQuantum = quantum;
        programaActual.tRespuesta = timerGlobal - programaActual.tLlegada;
        campo2.innerHTML = "Operacion: " + programaActual.num_a + ' ' + programaActual.operacion + ' ' + programaActual.num_b;
        campo3.innerHTML = "Tiempo Maximo Estimado: " + programaActual.tiempo;
        campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
        campo5.innerHTML = "Tiempo Restante: " + timerLocal;
        campo6.innerHTML = "ID: " + programaActual.id;
        campo7.innerHTML = "quantum: " + timerQuantum;
        //Creando reloj
        global = setInterval(function(){
            if (!paused) {
                timerGlobal +=1;
                timerLocal--;
                timerQuantum--;
                tGlobal.innerHTML = timerGlobal;
                var index = 0;
                while ( index < programasBloqueados.length ) {
                    programasBloqueados[index].blockTime -=1;
                    var item = programasBloqueados[index];
                    if (item.blockTime === 0){
                        contenedor.changeState(programasBloqueados[index].paginas, "cargado");
                        programasBloqueados.splice(index, 1);
                        addProgram(item.id, item.tiempo, item.tiempoRestante);
                        programasListos.push(item);
                    }
                    else index++;
                }
                updateBloqueados();
            }
            if (timerLocal == 0) {//Termino la ejecucion de un programa
                if (programaActual.tiempo > 0) {
                    // programaActual = getNextPrograma(); se hace dentro de addToDone();
                    programaActual.tFinalizacion = timerGlobal;
                    programaActual.tRetorno = timerGlobal - programaActual.tLlegada;
                    programaActual.tServicio = programaActual.tiempo;
                    programaActual.tEspera = programaActual.tRetorno - programaActual.tServicio;
                    programaActual.estado = "terminado";
                    programasTerminados.push(programaActual);
                    contenedor.freeProgram(programaActual.paginas);
                    addToDone(programaActual, false);//Si es programa lo agrega a terminado
                }
                else if (programaActual.tiempo === -1) {//Checa si ya se desbloqueo un programa
                    programaActual = getNextPrograma();
                }
                //Aqui ya cargó un programa nuevo
                timerQuantum = quantum;
                if(programaActual.tiempo === 0){//Señal de que se terminaron todos los programas
                    //Termina ejecucion
                    campo2.innerHTML = "Operacion: HALT";
                    campo3.innerHTML = "Tiempo Maximo Estimado: 0";
                    campo4.innerHTML = "Tiempo Transcurrido: 0";
                    campo5.innerHTML = "Tiempo Restante: 0";
                    campo6.innerHTML = "ID: HALT";
                    estado.innerHTML = "0";
                    campo7.innerHTML = "quantum: -";
                    document.removeEventListener('keydown', teclado);
                    clearInterval(global);
                    showProcessTable();
                }
                else if (programaActual.tiempo === -1) {//Señal de que hay programas en bloqueo
                    timerLocal = 1;
                    campo2.innerHTML = "Operacion: ESPERANDO DESBLOQUEO";
                    campo3.innerHTML = "Tiempo Maximo Estimado: 0";
                    campo4.innerHTML = "Tiempo Transcurrido: 0";
                    campo5.innerHTML = "Tiempo Restante: 0";
                    campo6.innerHTML = "ID: WAIT";
                    campo7.innerHTML = "quantum: -";
                }
                else{//Es un programa
                    if (programaActual.interrumpido) {//Checa si se habia bloqueado anteriormente
                        timerLocal = programaActual.tiempoRestante;
                    }
                    else {//Es un programa ejecutado por primera vez
                        timerLocal = programaActual.tiempo;
                        programaActual.tRespuesta = timerGlobal - programaActual.tLlegada;
                    }//Actualiza datos en pantalla
                    campo2.innerHTML = "Operacion: " + programaActual.num_a + ' ' + programaActual.operacion + ' ' + programaActual.num_b;
                    campo3.innerHTML = "Tiempo Maximo Estimado: " + programaActual.tiempo;
                    campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
                    campo5.innerHTML = "Tiempo Restante: " + timerLocal;
                    campo6.innerHTML = "ID: " + programaActual.id;
                    campo7.innerHTML = "quantum: " + timerQuantum;
                }
            }
            else if (timerQuantum == 0) {
                timerQuantum = quantum;
                if (programaActual.tiempo > 0) {
                    programaActual.tiempoRestante = timerLocal;
                    programaActual.interrumpido = true;
                    addProgram(programaActual.id, programaActual.tiempo, programaActual.tiempoRestante);
                    contenedor.changeState(programaActual.paginas, "cargado");
                    programasListos.push(programaActual);
                    programaActual = getNextPrograma();
                    //Actualiza datos en la caja de ejecución
                    if (programaActual.interrumpido) {//Checa si se habia bloqueado anteriormente
                        timerLocal = programaActual.tiempoRestante;
                    }
                    else {//Es un programa ejecutado por primera vez
                        timerLocal = programaActual.tiempo;
                        programaActual.tRespuesta = timerGlobal - programaActual.tLlegada;
                    }//Actualiza datos en pantalla
                    campo2.innerHTML = "Operacion: " + programaActual.num_a + ' ' + programaActual.operacion + ' ' + programaActual.num_b;
                    campo3.innerHTML = "Tiempo Maximo Estimado: " + programaActual.tiempo;
                    campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
                    campo5.innerHTML = "Tiempo Restante: " + timerLocal;
                    campo6.innerHTML = "ID: " + programaActual.id;
                    campo7.innerHTML = "quantum: " + timerQuantum;
                }
            }
            else {//Actualiza datos en pantalla
                campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
                campo5.innerHTML = "Tiempo Restante: " + timerLocal;
                campo7.innerHTML = "quantum: " + timerQuantum;
            }
            contenedor.draw();
        }, 1000);

        //Eventos del teclado (solo se escucha el teclado ya que empieza la simulacion)
        document.addEventListener('keydown', teclado);
    }
}

function teclado(){
    if (event.keyCode === 69) {//Interrupcion
        if (!paused && programaActual.tiempo > 0) {
            programaActual.tiempoRestante = timerLocal;
            programaActual.interrumpido = true;
            programaActual.blockTime = 9;
            contenedor.changeState(programaActual.paginas, "locked");
            addProgramaBloqueado(programaActual.id, programaActual.blockTime);
            programasBloqueados.push(programaActual);
            programaActual = getNextPrograma();
            contenedor.draw();
            timerQuantum = quantum;
            if (programaActual.tiempo === -1) {
                timerLocal = 1;
                campo2.innerHTML = "Operacion: ESPERANDO DESBLOQUEO";
                campo3.innerHTML = "Tiempo Maximo Estimado: 0";
                campo4.innerHTML = "Tiempo Transcurrido: 0";
                campo5.innerHTML = "Tiempo Restante: 0";
                campo6.innerHTML = "ID: WAIT";
                campo7.innerHTML = "quantum: -";
            }
            else {
                if (programaActual.interrumpido) {
                    timerLocal = programaActual.tiempoRestante;
                }
                else {
                    timerLocal = programaActual.tiempo;
                    programaActual.tRespuesta = timerGlobal - programaActual.tLlegada;
                }
                campo2.innerHTML = "Operacion: " + programaActual.num_a + ' ' + programaActual.operacion + ' ' + programaActual.num_b;
                campo3.innerHTML = "Tiempo Maximo Estimado: " + programaActual.tiempo;
                campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
                campo5.innerHTML = "Tiempo Restante: " + timerLocal;
                campo6.innerHTML = "ID: " + programaActual.id;
                campo7.innerHTML = "quantum: " + timerQuantum;
            }
        }
    }
    else if (event.keyCode === 87) {//Error
        if (!paused && programaActual.tiempo > 0) {
            programaActual.tFinalizacion = timerGlobal;
            programaActual.tRetorno = timerGlobal - programaActual.tLlegada;
            programaActual.tServicio = programaActual.tiempo - timerLocal;
            programaActual.tEspera = programaActual.tRetorno - programaActual.tServicio;
            programaActual.estado = "error";
            programasTerminados.push(programaActual);
            contenedor.freeProgram(programaActual.paginas);
            addToDone(programaActual, true);
            contenedor.draw();
            timerQuantum = quantum;
            if(programaActual.tiempo === 0){
                //Termina ejecucion
                campo2.innerHTML = "Operacion: HALT";
                campo3.innerHTML = "Tiempo Maximo Estimado: 0";
                campo4.innerHTML = "Tiempo Transcurrido: 0";
                campo5.innerHTML = "Tiempo Restante: 0";
                campo6.innerHTML = "ID: HALT";
                estado.innerHTML = "0";
                campo7.innerHTML = "quantum: -";
                document.removeEventListener('keydown', teclado);
                clearInterval(global);
                showProcessTable();
            }
            else if (programaActual.tiempo === -1) {
                //quedan programas en la lista de bloqueados
                timerLocal = 1;
                campo2.innerHTML = "Operacion: ESPERANDO DESBLOQUEO";
                campo3.innerHTML = "Tiempo Maximo Estimado: 0";
                campo4.innerHTML = "Tiempo Transcurrido: 0";
                campo5.innerHTML = "Tiempo Restante: 0";
                campo6.innerHTML = "ID: WAIT";
                campo7.innerHTML = "quantum: -";
            }
            else{
                if (programaActual.interrumpido) {
                    timerLocal = programaActual.tiempoRestante;
                }
                else {
                    timerLocal = programaActual.tiempo;
                    programaActual.tRespuesta = timerGlobal - programaActual.tLlegada;
                }
                campo2.innerHTML = "Operacion: " + programaActual.num_a + ' ' + programaActual.operacion + ' ' + programaActual.num_b;
                campo3.innerHTML = "Tiempo Maximo Estimado: " + programaActual.tiempo;
                campo4.innerHTML = "Tiempo Transcurrido: " + (programaActual.tiempo - timerLocal);
                campo5.innerHTML = "Tiempo Restante: " + timerLocal;
                campo6.innerHTML = "ID: " + programaActual.id;
                campo7.innerHTML = "quantum: " + timerQuantum;
            }
        }
    }
    else if (event.keyCode === 80) {//Pause
        paused = true;
        tGlobal.innerHTML = timerGlobal + " (PAUSADO)";
    }
    else if (event.keyCode === 67) { //Continue
        if (paused) {
            paused = false;
            tGlobal.innerHTML = timerGlobal;
            if (processTableMode) {
                deleteProcessTable();
                processTableMode = false;
            }
        }
    }
    else if (event.keyCode === 78) {//Nuevo
        if (!paused) {
            agregaProgramas(1);
            while (programasNuevos.length > 0) {
                let ans = contenedor.load(programasNuevos[0].memSpace, "cargado", programasNuevos[0].id);
                if (ans.length > 0) {
                    nuevos.removeChild(nuevos.firstChild);
                    temporal = programasNuevos.shift();
                    temporal.tLlegada = timerGlobal;
                    temporal.paginas = ans;
                    addProgram(temporal.id, temporal.tiempo, temporal.tiempo);
                    programasListos.push(temporal);
                }
                else {
                    break;
                }
            }
            contenedor.draw();
            estado.innerHTML = (programasNuevos.length);
        }
    }
    else if (event.keyCode === 66) {//Tabla de procesos
        if (!paused) {
            processTableMode = true;
            paused = true;
            tGlobal.innerHTML = timerGlobal + " (PAUSADO)";
            showProcessTable();
        }
    }
    else if (event.keyCode === 84) {//Tabla de memoria
        if (!paused) {
            processTableMode = true;
            paused = true;
            tGlobal.innerHTML = timerGlobal + " (PAUSADO)";
            showMemoryTable();
        }
    }
    else if (event.keyCode === 83) {//Suspender
        if (!paused) {
            //Validar que haya programa en bloqueado
            //Mover el primer programa en bloqueados a suspendidos
            //Hacer que el programa no termine si hay programas suspendidos
            //Ver como arreglar loss tiempos
            //Mostrar cantidad de procesos suspendidos
            //Mostrar ID y tamaño del programa que esta por salir de suspendido
            processTableMode = true;
            paused = true;
            tGlobal.innerHTML = timerGlobal + " (PAUSADO)";
            showMemoryTable();
        }
    }
    else if (event.keyCode === 82) {//Regresar
        if (!paused) {
            //Validar que haya programa en suspendido
            //Mover programa a memoria principal si es que cabe, si no lo ignoro
            //Acomodar tiempos
            processTableMode = true;
            paused = true;
            tGlobal.innerHTML = timerGlobal + " (PAUSADO)";
            showMemoryTable();
        }
    }
}

function cantProgramasEjec(){//Devuelve cantidad de procesos listos, bloqueados y ejecutando
    let cant = 0;
    if (programaActual.tiempo > 0) {
        cant +=1;
    }
    cant += programasListos.length;
    cant += programasBloqueados.length;
    return cant;
}

function addProgram(id, tiempo, restante){
    campo = document.createElement("p");
    campo.innerHTML = "ID: " + id;
    campoT = document.createElement("p");
    campoT.innerHTML = "Tiempo Maximo Estimado: " + tiempo;
    campoTR = document.createElement("p");
    campoTR.innerHTML = "Tiempo Restante: " + restante;

    nuevo = document.createElement("li");
    nuevo.appendChild(campo);
    nuevo.appendChild(campoT);
    nuevo.appendChild(campoTR);

    lista.appendChild(nuevo);
}

function addProgramaNuevo(id, tiempo, op, mem){
    let campo = document.createElement("p");
    campo.innerHTML = "ID: " + id;
    let campoT = document.createElement("p");
    campoT.innerHTML = "Tiempo Maximo Estimado: " + tiempo;

    let campoOP = document.createElement("p");
    campoOP.innerHTML = op;

    let campoMem = document.createElement("p");
    campoMem.innerHTML = "Memoria necesaria: " + mem + " (" + Math.ceil(mem/4) + " marcos)";

    nuevo = document.createElement("li");
    nuevo.appendChild(campo);
    nuevo.appendChild(campoT);
    nuevo.appendChild(campoOP);
    nuevo.appendChild(campoMem);

    nuevos.appendChild(nuevo);
}

function addProgramaBloqueado(id, tiempo){
    campo = document.createElement("p");
    campo.innerHTML = "ID: " + id;
    campoT = document.createElement("p");
    campoT.innerHTML = "Tiempo Bloqueado Restante: " + tiempo;

    nuevo = document.createElement("li");
    nuevo.appendChild(campo);
    nuevo.appendChild(campoT);

    bloqueados.appendChild(nuevo);
}

function updateBloqueados(){
    while (bloqueados.firstChild) {
        bloqueados.removeChild(bloqueados.firstChild);
    }
    for (var i = 0; i < programasBloqueados.length; i++) {
        addProgramaBloqueado(programasBloqueados[i].id, programasBloqueados[i].blockTime);
    }
}

function showProcessTable(){
    let outterText = document.createElement("p");
    let processTable = document.createElement("div");
    let processList = document.createElement("ul");
    outterText.innerHTML = "Tabla de procesos:&darr;";
    processTable.className = "caja";
    processTable.appendChild(processList);

    //Proceso Actual
    if (programaActual.tiempo > 0) {//Checa que no este vacio el CPU
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let processOP = document.createElement("p");
        let processTLLegada = document.createElement("p");
        let processTFin = document.createElement("p");
        let processTRet = document.createElement("p");
        let processTEspera = document.createElement("p");
        let processTServicio = document.createElement("p");
        let processTRestante = document.createElement("p");
        let processTResp = document.createElement("p");

        processID.innerHTML = "ID: " + programaActual.id;
        processEstado.innerHTML = "Estado: En ejecucion";

        switch (programaActual.operacion) {
            case "+":
            processOP.innerHTML = "Operacion: " + programaActual.num_a + ' + ' + programaActual.num_b;
            break;
            case "-":
            processOP.innerHTML = "Operacion: " + programaActual.num_a + ' - ' + programaActual.num_b;
            break;
            case "*":
            processOP.innerHTML = "Operacion: " + programaActual.num_a + ' * ' + programaActual.num_b;
            break;
            case "/":
            processOP.innerHTML = "Operacion: " + programaActual.num_a + ' / ' + programaActual.num_b;
            break;
            case "%":
            processOP.innerHTML = "Operacion: residuo de " + programaActual.num_a + ' / ' + programaActual.num_b;
            break;
            case "sqrt":
            processOP.innerHTML = "Operacion: &radic;" + programaActual.num_a;
            break;
            case "porc":
            processOP.innerHTML = "Operacion: " + programaActual.num_a + ' por ciento de ' + programaActual.num_b;
            break;
            default:
        }

        let tiempoServido = programaActual.tiempo - timerLocal;
        let tiempoEnMemoria = timerGlobal - programaActual.tLlegada;

        processTLLegada.innerHTML = "Tiempo de llegada: " + programaActual.tLlegada;
        processTFin.innerHTML = "Tiempo de finalización: N/A";
        processTRet.innerHTML = "Tiempo de retorno: N/A";
        processTEspera.innerHTML = "Tiempo de espera: " + (tiempoEnMemoria - tiempoServido);
        processTServicio.innerHTML = "Tiempo de servicio: " + tiempoServido;
        processTRestante.innerHTML = "Tiempo restante en CPU: " + timerLocal;
        processTResp.innerHTML = "Tiempo de respuesta: " + programaActual.tRespuesta;

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(processOP);
        item.appendChild(processTLLegada);
        item.appendChild(processTFin);
        item.appendChild(processTRet);
        item.appendChild(processTEspera);
        item.appendChild(processTServicio);
        item.appendChild(processTRestante);
        item.appendChild(processTResp);
        item.className = "ejec";
        processList.appendChild(item);
    }
    //Procesos Nuevos
    for (var i = 0; i < programasNuevos.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let processOP = document.createElement("p");
        let processTLLegada = document.createElement("p");
        let processTFin = document.createElement("p");
        let processTRet = document.createElement("p");
        let processTEspera = document.createElement("p");
        let processTServicio = document.createElement("p");
        let processTRestante = document.createElement("p");
        let processTResp = document.createElement("p");

        processID.innerHTML = "ID: " + programasNuevos[i].id;
        processEstado.innerHTML = "Estado: Nuevo";

        switch (programasNuevos[i].operacion) {
            case "+":
            processOP.innerHTML = "Operacion: " + programasNuevos[i].num_a + ' + ' + programasNuevos[i].num_b;
            break;
            case "-":
            processOP.innerHTML = "Operacion: " + programasNuevos[i].num_a + ' - ' + programasNuevos[i].num_b;
            break;
            case "*":
            processOP.innerHTML = "Operacion: " + programasNuevos[i].num_a + ' * ' + programasNuevos[i].num_b;
            break;
            case "/":
            processOP.innerHTML = "Operacion: " + programasNuevos[i].num_a + ' / ' + programasNuevos[i].num_b;
            break;
            case "%":
            processOP.innerHTML = "Operacion: residuo de " + programasNuevos[i].num_a + ' / ' + programasNuevos[i].num_b;
            break;
            case "sqrt":
            processOP.innerHTML = "Operacion: &radic;" + programasNuevos[i].num_a;
            break;
            case "porc":
            processOP.innerHTML = "Operacion: " + programasNuevos[i].num_a + ' por ciento de ' + programasNuevos[i].num_b;
            break;
            default:
        }

        processTLLegada.innerHTML = "Tiempo de llegada: N/A";
        processTFin.innerHTML = "Tiempo de finalización: N/A";
        processTRet.innerHTML = "Tiempo de retorno: N/A";
        processTEspera.innerHTML = "Tiempo de espera: N/A";
        processTServicio.innerHTML = "Tiempo de servicio: 0";
        processTRestante.innerHTML = "Tiempo restante en CPU: " + programasNuevos[i].tiempo;
        processTResp.innerHTML = "Tiempo de respuesta: N/A";

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(processOP);
        item.appendChild(processTLLegada);
        item.appendChild(processTFin);
        item.appendChild(processTRet);
        item.appendChild(processTEspera);
        item.appendChild(processTServicio);
        item.appendChild(processTRestante);
        item.appendChild(processTResp);
        item.className = "nuevo";
        processList.appendChild(item);
    }
    //Procesos Listos
    for (var i = 0; i < programasListos.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let processOP = document.createElement("p");
        let processTLLegada = document.createElement("p");
        let processTFin = document.createElement("p");
        let processTRet = document.createElement("p");
        let processTEspera = document.createElement("p");
        let processTServicio = document.createElement("p");
        let processTRestante = document.createElement("p");
        let processTResp = document.createElement("p");

        processID.innerHTML = "ID: " + programasListos[i].id;
        processEstado.innerHTML = "Estado: Listo";

        switch (programasListos[i].operacion) {
            case "+":
            processOP.innerHTML = "Operacion: " + programasListos[i].num_a + ' + ' + programasListos[i].num_b;
            break;
            case "-":
            processOP.innerHTML = "Operacion: " + programasListos[i].num_a + ' - ' + programasListos[i].num_b;
            break;
            case "*":
            processOP.innerHTML = "Operacion: " + programasListos[i].num_a + ' * ' + programasListos[i].num_b;
            break;
            case "/":
            processOP.innerHTML = "Operacion: " + programasListos[i].num_a + ' / ' + programasListos[i].num_b;
            break;
            case "%":
            processOP.innerHTML = "Operacion: residuo de " + programasListos[i].num_a + ' / ' + programasListos[i].num_b;
            break;
            case "sqrt":
            processOP.innerHTML = "Operacion: &radic;" + programasListos[i].num_a;
            break;
            case "porc":
            processOP.innerHTML = "Operacion: " + programasListos[i].num_a + ' por ciento de ' + programasListos[i].num_b;
            break;
            default:
        }

        let tiempoServido;
        let tiempoEnMemoria = timerGlobal - programasListos[i].tLlegada;

        if (programasListos[i].interrumpido) {
            tiempoServido = programasListos[i].tiempo - programasListos[i].tiempoRestante;
            processTServicio.innerHTML = "Tiempo de servicio: " + tiempoServido;
            processTEspera.innerHTML = "Tiempo de espera: " + (tiempoEnMemoria - tiempoServido);
            processTResp.innerHTML = "Tiempo de respuesta: " + programasListos[i].tRespuesta;
            processTRestante.innerHTML = "Tiempo restante en CPU: " + programasListos[i].tiempoRestante;
        }
        else {
            processTServicio.innerHTML = "Tiempo de servicio: 0";
            processTEspera.innerHTML = "Tiempo de espera: " + tiempoEnMemoria;
            processTResp.innerHTML = "Tiempo de respuesta: N/A";
            processTRestante.innerHTML = "Tiempo restante en CPU: " + programasListos[i].tiempo;
        }

        processTLLegada.innerHTML = "Tiempo de llegada: " + programasListos[i].tLlegada;
        processTFin.innerHTML = "Tiempo de finalización: N/A";
        processTRet.innerHTML = "Tiempo de retorno: N/A";

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(processOP);
        item.appendChild(processTLLegada);
        item.appendChild(processTFin);
        item.appendChild(processTRet);
        item.appendChild(processTEspera);
        item.appendChild(processTServicio);
        item.appendChild(processTRestante);
        item.appendChild(processTResp);
        item.className = "listo";
        processList.appendChild(item);
    }
    //Procesos Bloqueados
    for (var i = 0; i < programasBloqueados.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let processOP = document.createElement("p");
        let processBloqueo = document.createElement("p");
        let processTLLegada = document.createElement("p");
        let processTFin = document.createElement("p");
        let processTRet = document.createElement("p");
        let processTEspera = document.createElement("p");
        let processTServicio = document.createElement("p");
        let processTRestante = document.createElement("p");
        let processTResp = document.createElement("p");

        processID.innerHTML = "ID: " + programasBloqueados[i].id;
        processEstado.innerHTML = "Estado: Bloqueado";

        switch (programasBloqueados[i].operacion) {
            case "+":
            processOP.innerHTML = "Operacion: " + programasBloqueados[i].num_a + ' + ' + programasBloqueados[i].num_b;
            break;
            case "-":
            processOP.innerHTML = "Operacion: " + programasBloqueados[i].num_a + ' - ' + programasBloqueados[i].num_b;
            break;
            case "*":
            processOP.innerHTML = "Operacion: " + programasBloqueados[i].num_a + ' * ' + programasBloqueados[i].num_b;
            break;
            case "/":
            processOP.innerHTML = "Operacion: " + programasBloqueados[i].num_a + ' / ' + programasBloqueados[i].num_b;
            break;
            case "%":
            processOP.innerHTML = "Operacion: residuo de " + programasBloqueados[i].num_a + ' / ' + programasBloqueados[i].num_b;
            break;
            case "sqrt":
            processOP.innerHTML = "Operacion: &radic;" + programasBloqueados[i].num_a;
            break;
            case "porc":
            processOP.innerHTML = "Operacion: " + programasBloqueados[i].num_a + ' por ciento de ' + programasBloqueados[i].num_b;
            break;
            default:
        }

        let tiempoServido = programasBloqueados[i].tiempo - programasBloqueados[i].tiempoRestante;
        let tiempoEnMemoria = timerGlobal - programasBloqueados[i].tLlegada;

        processBloqueo.innerHTML = "Tiempo restante de bloqueo: " + programasBloqueados[i].blockTime;
        processTLLegada.innerHTML = "Tiempo de llegada: " + programasBloqueados[i].tLlegada;
        processTFin.innerHTML = "Tiempo de finalización: N/A";
        processTRet.innerHTML = "Tiempo de retorno: N/A";
        processTEspera.innerHTML = "Tiempo de espera: " + (tiempoEnMemoria - tiempoServido);
        processTServicio.innerHTML = "Tiempo de servicio: " + tiempoServido;
        processTRestante.innerHTML = "Tiempo restante en CPU: " + programasBloqueados[i].tiempoRestante;
        processTResp.innerHTML = "Tiempo de respuesta: " + programasBloqueados[i].tRespuesta;

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(processOP);
        item.appendChild(processBloqueo);
        item.appendChild(processTLLegada);
        item.appendChild(processTFin);
        item.appendChild(processTRet);
        item.appendChild(processTEspera);
        item.appendChild(processTServicio);
        item.appendChild(processTRestante);
        item.appendChild(processTResp);
        item.className = "bloqueado";
        processList.appendChild(item);
    }
    //Procesos Terminados
    for (var i = 0; i < programasTerminados.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let processOP = document.createElement("p");
        let processRes = document.createElement("p");
        let processTLLegada = document.createElement("p");
        let processTFin = document.createElement("p");
        let processTRet = document.createElement("p");
        let processTEspera = document.createElement("p");
        let processTServicio = document.createElement("p");
        let processTRestante = document.createElement("p");
        let processTResp = document.createElement("p");
        let res;

        processID.innerHTML = "ID: " + programasTerminados[i].id;

        switch (programasTerminados[i].operacion) {
            case "+":
            res = Number(programasTerminados[i].num_a) + Number(programasTerminados[i].num_b);
            processOP.innerHTML = "Operacion: " + programasTerminados[i].num_a + ' + ' + programasTerminados[i].num_b;
            break;
            case "-":
            res = Number(programasTerminados[i].num_a) - Number(programasTerminados[i].num_b);
            processOP.innerHTML = "Operacion: " + programasTerminados[i].num_a + ' - ' + programasTerminados[i].num_b;
            break;
            case "*":
            res = Number(programasTerminados[i].num_a) * Number(programasTerminados[i].num_b);
            processOP.innerHTML = "Operacion: " + programasTerminados[i].num_a + ' * ' + programasTerminados[i].num_b;
            break;
            case "/":
            res = Number(programasTerminados[i].num_a) / Number(programasTerminados[i].num_b);
            processOP.innerHTML = "Operacion: " + programasTerminados[i].num_a + ' / ' + programasTerminados[i].num_b;
            break;
            case "%":
            res = Number(programasTerminados[i].num_a) % Number(programasTerminados[i].num_b);
            processOP.innerHTML = "Operacion: residuo de " + programasTerminados[i].num_a + ' / ' + programasTerminados[i].num_b;
            break;
            case "sqrt":
            res = Math.sqrt(Number(programasTerminados[i].num_a))
            processOP.innerHTML = "Operacion: &radic;" + programasTerminados[i].num_a;
            break;
            case "porc":
            res = Number(programasTerminados[i].num_a) * Number(programasTerminados[i].num_b)/100;
            processOP.innerHTML = "Operacion: " + programasTerminados[i].num_a + ' por ciento de ' + programasTerminados[i].num_b;
            break;
            default:
            res = "error";
        }
        if (programasTerminados[i].estado == "error") {
            processEstado.innerHTML = "Estado: Terminado por error";
            processRes.innerHTML = "Resultado: ERROR";
        }
        else {
            processEstado.innerHTML = "Estado: Terminado correctamente";
            processRes.innerHTML = "Resultado: " + res;
        }

        processTLLegada.innerHTML = "Tiempo de llegada: " + programasTerminados[i].tLlegada;
        processTFin.innerHTML = "Tiempo de finalización: " + programasTerminados[i].tFinalizacion;
        processTRet.innerHTML = "Tiempo de retorno: " + programasTerminados[i].tRetorno;
        processTEspera.innerHTML = "Tiempo de espera: " + programasTerminados[i].tEspera;
        processTServicio.innerHTML = "Tiempo de servicio: " + programasTerminados[i].tServicio;
        processTRestante.innerHTML = "Tiempo restante en CPU: N/A";
        processTResp.innerHTML = "Tiempo de respuesta: " + programasTerminados[i].tRespuesta;

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(processOP);
        item.appendChild(processRes);
        item.appendChild(processTLLegada);
        item.appendChild(processTFin);
        item.appendChild(processTRet);
        item.appendChild(processTEspera);
        item.appendChild(processTServicio);
        item.appendChild(processTRestante);
        item.appendChild(processTResp);
        item.className = "terminado";
        processList.appendChild(item);
    }

    tablaProcCont.appendChild(outterText);
    tablaProcCont.appendChild(processTable);
}

function showMemoryTable(){
    let outterText = document.createElement("p");
    let processTable = document.createElement("div");
    let processList = document.createElement("ul");
    outterText.innerHTML = "Tabla de páginas:&darr;";
    processTable.className = "caja";
    processTable.appendChild(processList);

    //Proceso Actual
    if (programaActual.tiempo > 0) {//Checa que no este vacio el CPU
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let paginaProg = document.createElement("p");

        processID.innerHTML = "ID: " + programaActual.id;
        processEstado.innerHTML = "Estado: En ejecucion";
        paginaProg.innerHTML = "Páginas usadas: ";

        for (var i = 0; i < programaActual.paginas.length; i++) {
            paginaProg.innerHTML += programaActual.paginas[i];
            if (i < (programaActual.paginas.length)-1) {
                paginaProg.innerHTML += ", ";
            }
        }

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(paginaProg);
        item.className = "ejec";
        processList.appendChild(item);
    }
    //Procesos Listos
    for (var i = 0; i < programasListos.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let paginaProg = document.createElement("p");

        processID.innerHTML = "ID: " + programasListos[i].id;
        processEstado.innerHTML = "Estado: Listo";
        paginaProg.innerHTML = "Páginas usadas: ";

        for (var j = 0; j < programasListos[i].paginas.length; j++) {
            paginaProg.innerHTML += programasListos[i].paginas[j];
            if (j < (programasListos[i].paginas.length)-1) {
                paginaProg.innerHTML += ", ";
            }
        }

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(paginaProg);
        item.className = "listo";
        processList.appendChild(item);
    }
    //Procesos Bloqueados
    for (var i = 0; i < programasBloqueados.length; i++) {
        let item = document.createElement("li");
        let processID = document.createElement("p");
        let processEstado = document.createElement("p");
        let paginaProg = document.createElement("p");

        processID.innerHTML = "ID: " + programasBloqueados[i].id;
        processEstado.innerHTML = "Estado: Bloqueado";
        paginaProg.innerHTML = "Páginas usadas: ";

        for (var j = 0; j < programasBloqueados[i].paginas.length; j++) {
            paginaProg.innerHTML += programasBloqueados[i].paginas[j];
            if (j < (programasBloqueados[i].paginas.length)-1) {
                paginaProg.innerHTML += ", ";
            }
        }

        item.appendChild(processID);
        item.appendChild(processEstado);
        item.appendChild(paginaProg);
        item.className = "bloqueado";
        processList.appendChild(item);
    }

    let libres = contenedor.getAllMarcosDisponibles();
    let paginaProg = document.createElement("p");
    paginaProg.innerHTML = "Páginas libres: ";
    for (var i = 0; i < libres.length; i++) {
        paginaProg.innerHTML += libres[i];
        if (i < (libres.length)-1) {
            paginaProg.innerHTML += ", ";
        }
    }
    processList.appendChild(paginaProg);

    tablaProcCont.appendChild(outterText);
    tablaProcCont.appendChild(processTable);
}

function deleteProcessTable(){
    while (tablaProcCont.firstChild) {
        tablaProcCont.removeChild(tablaProcCont.firstChild);
    }
}

function disableInput(){
    document.getElementById("cantidad").disabled=true;
    document.getElementById("quantum").disabled=true;
    document.getElementById("agregar").disabled=true;
    document.getElementById("start").disabled=true;
}

function enableInput(){
    document.getElementById("cantidad").disabled=false;
    document.getElementById("quantum").disabled=false;
    document.getElementById("agregar").disabled=false;
    document.getElementById("start").disabled=false;
}

function emptyInput(){
    document.getElementById("cantidad").value='';
    document.getElementById("quantum").value='';
}
contenedor.draw();
