package net.hoyoung.springws.ws.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectUtil {
	public static boolean isGetterMethod(Method m) {
		String name = m.getName();
		if (name.startsWith("get"))
			return true;
		else
			return false;
	}
	public static String getName(Method m) {
		StringBuffer sb = new StringBuffer(m.getName());
		sb.delete(0, 3);
		System.out.println(sb.toString());
		sb.setCharAt(0, Character.toLowerCase(sb.charAt(0)));
		return sb.toString();
	}
	public static Object getValue(Method m, Object obj) {
		Object o = null;
		try {
			o = m.invoke(obj, (Object[]) null);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		return o;
	}

}
