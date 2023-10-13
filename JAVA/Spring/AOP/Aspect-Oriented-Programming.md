관점지향 프로그래밍
A, B, C 세가지 클래스가 있다고 가정한다.
또한 X, Y, Z라는 Block이 있다고 가정한다.
A는 X, Y, Z로 이루어져 있다.
B는 X, Y로 이루어져 있다.
C는 X, Z로 이루어져 있다

이떄 X라는 내용을 변경할 때 모두 변경해야 한다는 번거로움이 있는데 AOP는 이를 모듈화해서 관리한다.

구체적인 내용에 대해선 아직 보류하지만 작동 원리를 알 수 있는 예제 코드를 적는다.
추후 수정이 필요한 문서.

| 메서드              | 설명                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| **@Aspect**         | 해당 클래스를 Aspect로 사용하겠다는 것을 명시합니다.                 |
| **@Before**         | 대상 “메서드”가 실행되기 전에 Advice를 실행합니다.                   |
| **@AfterReturning** | 대상 “메서드”가 정상적으로 실행되고 반환된 후에 Advice를 실행합니다. |
| **@AfterThrowing**  | 대상 “메서드에서 예외가 발생”했을 때 Advice를 실행합니다.            |
| **@After**          | 대상 “메서드”가 실행된 후에 Advice를 실행합니다.                     |
| **@Around**         | 대상 “메서드” 실행 전, 후 또는 예외 발생 시에 Advice를 실행합니다.   |

```java
@Aspect @Component @Slf4j public class LoggingAspect {
/** * Before: 대상 “메서드”가 실행되기 전에 Advice를 실행합니다. * * @param joinPoint */ 
@Before("execution(* com.adjh.multiflexapi.controller.*.*(..))") 
public void logBefore(JoinPoint joinPoint) { log.info("Before: " + joinPoint.getSignature().getName()); } 

/** * After : 대상 “메서드”가 실행된 후에 Advice를 실행합니다. * * @param joinPoint */
@After("execution(* com.adjh.multiflexapi.controller.*.*(..))") 
public void logAfter(JoinPoint joinPoint) { log.info("After: " + joinPoint.getSignature().getName()); } 

/** * AfterReturning: 대상 “메서드”가 정상적으로 실행되고 반환된 후에 Advice를 실행합니다. * * @param joinPoint * @param result */ 
@AfterReturning(pointcut = "execution(* com.adjh.multiflexapi.controller.*.*(..))", returning = "result") 
public void logAfterReturning(JoinPoint joinPoint, Object result) { log.info("AfterReturning: " + joinPoint.getSignature().getName() + " result: " + result); } 

/** * AfterThrowing: 대상 “메서드에서 예외가 발생”했을 때 Advice를 실행합니다. * * @param joinPoint * @param e */ 
@AfterThrowing(pointcut = "execution(* com.adjh.multiflexapi.controller.*.*(..))", throwing = "e") 
public void logAfterThrowing(JoinPoint joinPoint, Throwable e) { log.info("AfterThrowing: " + joinPoint.getSignature().getName() + " exception: " + e.getMessage()); } 

/** * Around : 대상 “메서드” 실행 전, 후 또는 예외 발생 시에 Advice를 실행합니다. * * @param joinPoint * @return * @throws Throwable */ 
@Around("execution(* com.adjh.multiflexapi.controller.*.*(..))") public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable { log.info("Around before: " + joinPoint.getSignature().getName()); Object result = joinPoint.proceed(); log.info("Around after: " + joinPoint.getSignature().getName()); return result; } }
```