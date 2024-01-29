import { TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modal';

import { FotoPerfil } from '..';
import { getImageSource } from '../../utils/getImageSource';

interface Props {
    isModalVisible: boolean;
    selectImage: (imageRoute: string) => void;
}

export const ImageModal = ({ isModalVisible, selectImage }: Props) => {
    return (
        <Modal 
            isVisible={ isModalVisible }
            animationIn={ 'bounce' }
        >
            <View className='w-full items-center gap-y-20 rounded-2xl py-5'>
        
                <View className='w-1/2 flex-row justify-around'>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectImage('../../assets/profile/Picture1.jpg') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#ffff' }}
                    >
                        <FotoPerfil 
                            image={ getImageSource("Picture1") }
                            size='medium'
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectImage('../../assets/profile/Picture2.jpg') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#ffff' }}
                    >
                        <FotoPerfil 
                            image={ getImageSource("Picture2") }
                            size='medium'
                        />
                    </TouchableOpacity>
                    
                </View>
                
                <View className='w-1/2 flex-row justify-around'>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectImage('../../assets/profile/Picture3.jpg') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#ffff' }}
                    >
                        <FotoPerfil 
                            image={ getImageSource("Picture3") }
                            size='medium'
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectImage('../../assets/profile/Picture4.jpg') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#ffff' }}
                    >
                        <FotoPerfil 
                            image={ getImageSource("Picture4") }
                            size='medium'
                        />
                    </TouchableOpacity>
                    
                </View>

            </View>
        </Modal>
    );
};

