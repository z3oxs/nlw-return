import React from 'react';
import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { FeedbackType } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';

interface Props {
    onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export const Options = ({ onFeedbackTypeChanged }: Props) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Deixe seu feedback</Text>
            <View style={ styles.options }>
                {
                    Object.entries(feedbackTypes).map(([k, v]) => (
                        <Option
                            key={ k }
                            title={ v.title }
                            image={ v.image }
                            onPress={ () => onFeedbackTypeChanged(k as FeedbackType) }
                        />
                    ))
                }
            </View>
            <Copyright />
        </View>
    );
}
