import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.dsig.spec.XPathType;
import java.io.IOException;
import java.net.URL;

public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("LogFilter init!");
    }

    @Override
    public void destroy() {
        System.out.println("LogFilter destroy!");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest, servletResponse);
        long end = System.currentTimeMillis();
        String url = "?";
        String model = "?";
        if (servletRequest instanceof HttpServletRequest) {
            url = ((HttpServletRequest) servletRequest).getRequestURL().toString();
            model = ((HttpServletRequest) servletRequest).getMethod();
        }
        System.out.printf("URL: %s\nModel: %s\nTime: %d ms\n\n",url,model,end-start);
    }
}
