import {useState} from "react";
import DraggableFlatList, {RenderItemParams, ScaleDecorator,} from "react-native-draggable-flatlist";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

type Item = {
    key: string;
    label: number;
    color: string;
}

export default function HomeScreen() {
    const getColor = (i: number, numItems: number) => {
        const multiplier = 255 / (numItems - 1);
        const colorVal = i * multiplier;
        return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
    }

    const [data, setData] = useState<Item[]>(Array.from({length: 20}).map((_, i) => {
        return {
            key: `item-${i}`,
            label: i,
            color: getColor(i, 20),
        };
    }));

    return (
        <DraggableFlatList
            data={data}
            renderItem={({item, drag, isActive}: RenderItemParams<Item>) => (
                <ScaleDecorator>
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        delayLongPress={100}
                        style={[
                            styles.rowItem,
                            {backgroundColor: isActive ? "red" : item.color},
                        ]}
                    >
                        <Text style={styles.rowItemText}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                </ScaleDecorator>
            )}
            keyExtractor={(item, index) => item.key}
            onDragEnd={({data}) => setData(data)}
        />
    );
}

const styles = StyleSheet.create({
    rowItem: {
        height: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    rowItemText: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});