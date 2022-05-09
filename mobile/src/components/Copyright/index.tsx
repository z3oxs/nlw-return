import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export const Copyright = () => {
    return (
        <View>
            <Text
                style={ styles.text }
            >
                Feito com ♥ pela Rocketseat e z3oxs
            </Text>
        </View>
    );
}
