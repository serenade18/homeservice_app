import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAllCategories } from '../lib/actions'

const Categories = () => {
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData =  async () => {
        try {
            const response = await fetchAllCategories();
            console.log("categories", response)
        } catch (error) {
            
        }
    }

    return (
        <View>
            <Text className="text-3xl text-white">Categories</Text>
        </View>
    )
}

export default Categories