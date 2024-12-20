import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Link, SplashScreen, Stack, useRootNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { globalStyles } from "../constants/Styles";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useState } from "react";
import useThemeColor from "../hooks/useThemeColor";
import { Image } from "expo-image";
import { LayoutGrid, UsersRound, Settings, X, Mail, Package, Home, Menu, Wallet, ChartPie } from "lucide-react-native";
import { Text } from "./ui/text";
import { Text as RNEText } from "@rneui/themed"
import useCurrentUser from "~/hooks/useCurrentUser";
import { useVendorView } from "~/hooks/useVendorView";
import { canShowAdminMenu } from "~/utils/functions";


const ICON_SIZE = 35;

const toolbarColorPerPage: Record<string, string> = {
    "index": "white",
    "settings": "#F72F2F"
}

interface HeaderProps {
    style?: "light"|"dark",
    headerTitle?: string,
    rightIcon?: React.ReactNode
    noRightIcon?: boolean
}

const MenuLight = require('../assets/icons/menu-icon-light.svg');
const MenuRed = require('../assets/icons/menu-icon-red.svg');
const ShoppingBag = require('../assets/icons/shopping-bag.svg');


export default function Header({ style = "dark", headerTitle, rightIcon ,noRightIcon }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const route = useRootNavigation();
    const pageName = route?.getCurrentRoute()?.name! as string;


    const primary = useThemeColor({}, "primary");
    const { currentUser } = useCurrentUser();
    const { showVendorView } = useVendorView();

    const iconColor = {
        "light": "#fff",
        "dark": primary
    }

    const labelColor = {
        "light": "#fff",
        "dark": "#000"
    }


    const title = () => {
        if (!headerTitle) {
            return pageName === 'index' ? 'Orders' : pageName
        }

        return headerTitle
    }



    return (
        <>
            {
                !menuOpen ? null :
                <>
                    {
                        canShowAdminMenu(currentUser?.user_type, showVendorView) ? 
                        <AdminStaffMenu closeMenu={() => setMenuOpen(false)}/>
                        :
                        <VendorStaffMenu closeMenu={() => setMenuOpen(false)}/>
                    }
                </>
            }
        
            <View style={[styles.header,{ backgroundColor: toolbarColorPerPage[pageName], }]}>
                <View style={globalStyles.flexItemsCenter}>
                    <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                        <Image 
                            style={styles.headerIcon} 
                            source={style === 'light' ? MenuLight : MenuRed}
                        />
                    </Pressable>

                    <RNEText style={[styles.headerTitle, { color: labelColor[style!] }]}>
                        {title()}
                    </RNEText>
                </View>

                {
                    noRightIcon ? 
                    null : 
                    rightIcon || (pageName === 'settings/index' ? null : // If rightIcon is provided, render it; otherwise check pageName
                    <Link href="/pickup">
                        <Image style={styles.headerIcon} source={ShoppingBag}/>
                    </Link>)
                }

            </View>
        
        </>
    )
}

const AdminStaffMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    const router = useRouter();

    const moveToDashboard = () => {
        router.push('/admin/dashboard')
        return closeMenu()
    }

    const moveToMenu = () => {
        router.push('/menu')
        return closeMenu()
    }

    const moveToOrders = () => {
        router.push('/orders')
        return closeMenu()
    }

    const moveToStaff = () => {
        router.push('/admin/staff')
        return closeMenu()
    }

    const moveToSettings = () => {
        router.push('/settings')
        return closeMenu()
    }

    const moveToWallet = () => {
        router.push('/admin/wallet')
        return closeMenu()
    }




    return (
        <View style={styles.menu}>
            <View className="flex flex-col gap-4">
                <Pressable onPress={moveToDashboard} className="flex flex-row items-center gap-2">
                    <Home size={ICON_SIZE} color='white'/>
                    <Text className="text-white text-xl font-semibold">Dashboard</Text>
                </Pressable>

                <Pressable className="flex flex-row items-center gap-2" onPress={moveToDashboard}>
                    <ChartPie color='white' size={ICON_SIZE}/>    
                    <Text className="text-white text-xl font-semibold">Analytics</Text>                                                     
                </Pressable>

                <Pressable className="flex flex-row items-center gap-2" onPress={moveToMenu}>
                    <LayoutGrid color='white' size={ICON_SIZE}/> 
                    <Text className="text-white text-xl font-semibold">Menu</Text>                                     
                </Pressable>


                <Pressable onPress={moveToOrders} className="flex flex-row items-center gap-2">
                    <Mail  color='white' size={ICON_SIZE}/>  
                    <Text className="text-white text-xl font-semibold">Orders</Text>                  
                </Pressable>

                <Pressable onPress={moveToWallet} className="flex flex-row items-center gap-2">
                    <Wallet color='white' size={ICON_SIZE}/>  
                    <Text className="text-white text-xl font-semibold">Wallet</Text>                  
                </Pressable>

                <Pressable onPress={moveToStaff} className="flex flex-row items-center gap-2">
                    <UsersRound size={ICON_SIZE} color='white'/>
                    <Text className="text-white text-xl font-semibold">Staff</Text>
                </Pressable>

                <Pressable onPress={moveToSettings} className="flex flex-row items-center gap-2">
                    <Settings color='white' size={ICON_SIZE}/>    
                    <Text className="text-white text-xl font-semibold">Settings</Text>                
                </Pressable>
            </View>

        </View>
    )
}


const VendorStaffMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    const router = useRouter();

    const moveToMenu = () => {
        router.push("/menu")
        return closeMenu()
    }

    const moveToAdmin = () => {
        router.replace("/admin/staff")
        return closeMenu()
    }

    const moveToOrders = () => {
        router.push("/orders")
        return closeMenu()
    }

    return (
    <View style={styles.menu}>
        <View className="">
            <Pressable onPress={closeMenu}>
                <X size={ICON_SIZE} color="red"/>
            </Pressable>
        </View>
        
        <View className="flex flex-col gap-4">
            <Pressable onPress={moveToMenu}>
                <LayoutGrid color='white' size={ICON_SIZE}/>                    
            </Pressable>

            <Pressable onPress={moveToOrders} className="flex flex-row items-center gap-2">
                <Package size={ICON_SIZE} color='white'/>
                <Text className="text-white text-xl font-semibold">Orders</Text>
            </Pressable>

            <Pressable>
                <Mail color='white' size={ICON_SIZE}/>                    
            </Pressable>

            <Link href="/settings" onPressOut={closeMenu}>
                <Settings color='white' size={ICON_SIZE}/>                    
            </Link>

            <Pressable onPress={moveToAdmin} className="flex flex-row items-center gap-2">
                <UsersRound size={ICON_SIZE} color='white'/>
                <Text className="text-white text-xl font-semibold">Admin</Text>
            </Pressable>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#111111",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 200,
        position: "absolute",
        bottom: 0,
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 50
    },
    headerIcon: { width: 24, height: 24 },
    menuButons: {
        position: "absolute",
        top: "25%",
        left: "10%",
        ...globalStyles.flexItemsCenter,
        justifyContent: "center",
        flexDirection: "column"
    },
    header: {
        ...globalStyles.flexItemsCenter,
        justifyContent: "space-between",
        height: verticalScale(50),
        paddingHorizontal: scale(18)
    },
    headerTitle: {
        fontSize: scale(22),
        fontWeight: "700",
        marginLeft: 20,
        textTransform: "capitalize"
    }
})