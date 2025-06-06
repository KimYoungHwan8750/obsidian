```xml
<web-app>
    <!-- 1. aliases 설정 -->
    <servlet>
        <servlet-name>welcome</servlet-name>
        <servlet-class>servlets.WelcomeServlet</servlet-class>
    </servlet>
          .0
              <!-- 2. 매핑 -->
    <servlet-mapping>
        <servlet-name>welcome</servlet-name>
        <url-pattern>/welcome</url-pattern>
    </servlet-mapping>

</web-app>
```