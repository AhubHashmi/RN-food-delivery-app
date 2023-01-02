import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database';
import { useEffect } from 'react';
import styles from '../styling';
import { useState } from 'react';

export default function Cart({ navigation }) {
    const [list, setList] = useState([]);
    let getOrder = () => {
        database().ref('order').once('value', dt => {
            let li = Object.values(dt.val());
            setList([...li]);
        });
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <View style={[styles.p2, styles.bgLight]}>
            {list.map((e, i) => (<TouchableOpacity onPress={() => {
                navigation.navigate('Home', e)
            }}
                style={[
                    styles.p2,
                    styles.my1,
                    styles.rounded,
                    styles.bgWhite,
                    styles.shadow1,
                ]} key={i}>
                <Text style={[styles.fs3, styles.textBold, styles.px2, styles.m1]}>Your Order ;</Text>
                <Text style={[styles.fs3, styles.textPrimary]}>Name : {e.name}</Text>
                <Text style={[styles.fs3, styles.textPrimary]}>Description : {e.description}</Text>
                <Text style={[styles.fs3, styles.textPrimary]}>Calories : {e.calories}</Text>
            </TouchableOpacity>))}
        </View>
    );
}