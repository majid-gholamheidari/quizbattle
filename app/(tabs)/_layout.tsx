import {Tabs} from 'expo-router';
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#3a3a3a',
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 13,
                    marginHorizontal: 12,
                    borderRadius: 18,
                    backgroundColor: '#fff',
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowOffset: {width: 5, height: 5},
                    shadowRadius: 10,
                    height: 55,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                },
            }}
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Quiz',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'diamond' : 'diamond-outline'} color={color} size={24}/>
                    ),
                }}/>

            <Tabs.Screen
                name="score"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'trophy' : 'trophy-outline'} color={color} size={24}/>
                    )

                }}/>

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24}/>
                    )
                }}/>

        </Tabs>
    );
}
