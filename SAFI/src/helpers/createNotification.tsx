import RNFS from 'react-native-fs';
import PushNotification from 'react-native-push-notification';


const checkFiles = async () => {
    const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
    const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';

    if (!await RNFS.exists(pathId)) {
        RNFS.writeFile(pathId, JSON.stringify({lastId: 0}), 'utf8')
            .then(() => {
                console.log('Archivo LastID creado.');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (await RNFS.exists(path)) {
        const notificaciones = await RNFS.readFile(path, 'utf8')
        return JSON.parse(notificaciones);

    } else {
        await RNFS.writeFile(path, JSON.stringify([]), 'utf8')
        return [];
    }
}



export const createNotification = async (tituloMeta: string, fecha_final: Date) => {
    try {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';
        let notificaciones = await checkFiles();
        const idContent = await RNFS.readFile(pathId, 'utf8')
        const idDict = JSON.parse(idContent);
        const fechaActual = new Date();
        const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
        let count = 1;
        const diferencia = (fecha_final.getTime() - new Date().getTime()) / milisegundosEnUnDia;
  
        
        if (diferencia > 3) {
            const halfwayThere = Math.floor(diferencia / 2);
            
            let halfwayDate = new Date();
            halfwayDate.setDate(fechaActual.getDate() + halfwayThere);

            
            notificaciones = [...notificaciones, {
                id: (idDict.lastId + count),
                title: `Hoy es la mitad de tu plazo para ${tituloMeta}`,
                datetime: halfwayDate,
                annotations: '',
                isActive: true,
            }]
            
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: `Hoy es la mitad de tu plazo para ${tituloMeta}`,
                date: halfwayDate,
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: (idDict.lastId + count),
            });

            count++;
        } 
        
        
        let dateBefore = new Date(fecha_final.getFullYear(), fecha_final.getMonth(), fecha_final.getDate() - 1);

        notificaciones = [...notificaciones, {
            id: (idDict.lastId + count),
            title: `Ultimo dia de tu plazo para ${tituloMeta}`,
            datetime: dateBefore,
            annotations: '',
            isActive: true,
        }]
    
    
        PushNotification.localNotificationSchedule({
            channelId: 'safi-recordatorios',
            message: `Ultimo dia de tu plazo para ${tituloMeta}`,
            date: dateBefore,
            allowWhileIdle: true,
            playSound: true,
            soundName: "default",
            visibility: "public",
            vibrate: true,
            vibration: 1000,
            id: (idDict.lastId + count),
        });

    
        RNFS.writeFile(path, JSON.stringify(notificaciones), 'utf8')
            .then(() => {
                console.log('Archivo JSON actualizado con éxito.');
            })
            .catch((error) => {
                console.log(error);
            });
        
        RNFS.writeFile(pathId, JSON.stringify({lastId: (idDict.lastId + count)}), 'utf8')
            .then(() => {
                console.log('LastID actualizado con éxito.');
            })
            .catch((error) => {
                console.log(error);
            });       
    } catch (err) {
        console.error(err)
    }
}