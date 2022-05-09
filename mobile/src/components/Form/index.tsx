import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { theme } from '../../theme';
import { styles } from './styles';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export const Form = ({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) => {
    const [ screenshot, setScreenshot ] = useState<string | null>(null);
    const [ isSendingFeedback, setIsSendingFeedback ] = useState<boolean>(false);
    const [ comment, setComment ] = useState<string>('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const handleScreenshot = () =>
        captureScreen({
            format: 'png',
            quality: 0.8,
        })
            .then(uri => setScreenshot(uri))
            .catch(e => console.log(e));

    const handleScreenshotRemove = () => setScreenshot(null);

    const handleSendFeedback = async () => {
        if (isSendingFeedback) { return }

        setIsSendingFeedback(true);

        const screenshotB64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {
            encoding: 'base64',
        });

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${ screenshotB64 }`,
                comment,
            });

            onFeedbackSent();

        } catch (e) {
            console.log(e);

            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity
                    onPress={ onFeedbackCanceled }
                >
                    <ArrowLeft
                        size={ 24 }
                        weight="bold"
                        color={ theme.colors.text_secondary }
                    />
                </TouchableOpacity>
                <View style={ styles.titleContainer }>
                    <Image
                        source={ feedbackTypeInfo.image }
                        style={ styles.image }
                    />
                    <Text style={ styles.titleText }>
                        { feedbackTypeInfo.title }
                    </Text>
                </View>
            </View>
            <TextInput
                multiline
                autoCorrect={ false }
                style={ styles.input }
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={ theme.colors.text_secondary }
                onChangeText={ setComment }
            />
            <View style={ styles.footer }>
                <ScreenshotButton
                    onTakeShot={ handleScreenshot }
                    onRemoveShot={ handleScreenshotRemove }
                    screenshot={ screenshot }
                />
                <Button
                    isLoading={ isSendingFeedback }
                    onPress={ handleSendFeedback }
                />
            </View>
        </View>
    );
}
