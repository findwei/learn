[TOC]


# 策略模式

策略模式是一种行为设计模式，它定义了一系列算法，将每个算法封装到单独的类中，并使它们可以相互替换。策略模式使得算法可以独立于客户端而变化。

**结构**
策略模式由三个主要部分组成：
- 环境（Context）：环境类持有一个策略接口的引用，它将请求委派给具体的策略对象。
- 策略接口（Strategy Interface）：定义了所有支持的算法的通用接口。它通常包含一个单一的方法，该方法在策略模式中被称为 executeStrategy 或类似的名称。
- 具体策略（Concrete Strategies）：实现了策略接口，提供了算法的具体实现。

**简单的示例**
明策略模式。假设有一个支付系统，根据不同的支付方式（例如信用卡、支付宝、微信支付等）采用不同的支付策略。

```java

// 策略接口
interface PaymentStrategy {
    void pay(double amount);
}

// 具体策略：信用卡支付
class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via Credit Card.");
    }
}

// 具体策略：支付宝支付
class AliPayPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via AliPay.");
    }
}

// 具体策略：微信支付
class WeChatPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " via WeChat.");
    }
}

// 环境类
class PaymentContext {
    private PaymentStrategy paymentStrategy;

    public PaymentContext(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void performPayment(double amount) {
        paymentStrategy.pay(amount);
    }
}

// 客户端
public class StrategyPatternExample {
    public static void main(String[] args) {
        // 选择支付方式
        PaymentStrategy paymentStrategy = new CreditCardPayment(); // 可以根据需要切换支付方式
        PaymentContext paymentContext = new PaymentContext(paymentStrategy);

        // 进行支付
        paymentContext.performPayment(100.0);
    }
}

```
**示例**
假设三个人到银行办理业务，根据不同的人（例如老人、年起人、土豪）采用不同的策略。

```java
// 银行 - 环境类
public class Bank {
    //开门 等待用户进来办理业务
    public void profession(Person person){
        System.out.println(person.getName()+"客户进入银行啦");
        person.callNumber();
        person.transact();
        person.leave();
    }
}
// 人的父类 解决具体策略通用属性方法 这里同时也相当于 策略接口
public abstract class Person {
    protected String name;
    public String getName(){
        return this.name;
    }
    //1.进银行 叫一个号码 排队
    public abstract void callNumber();
    //2.去窗口办理
    public abstract void transact();
    //3.办理完毕离开啦
    public abstract void leave();
}
// 具体策略：老人
public class OldMan extends Person{

    public OldMan(){}
    public OldMan(String name){
        this.name=name;
    }
    //1.进银行 叫一个号码 排队
    public void callNumber(){
        System.out.println("年事已高 不知道在哪儿叫号 请求大堂经理的帮忙");
    }
    //2.去窗口办理
    public void transact(){
        System.out.println("到窗口 掏出手绢儿 拿出存折 取钱");
    }
    //3.办理完毕离开啦
    public void leave(){
        System.out.println("办理完毕 慢慢的离开啦");
    }

}
// 具体策略：年轻人
public class YoungMan extends Person{

    public YoungMan(){}
    public YoungMan(String name){
        this.name=name;
    }
    //1.进银行 叫一个号码 排队
    public void callNumber(){
        System.out.println("自己知道在门口按按钮 拿到号码小票");
    }
    //2.去窗口办理
    public void transact(){
        System.out.println("去窗口 汇款");
    }
    //3.办理完毕离开啦
    public void leave(){
        System.out.println("办理完迅速离开啦");
    }
}
// 具体策略：土豪
public class Toff extends Person{

    public Toff(){}
    public Toff(String name){
        this.name=name;
    }
    //1.进银行 叫一个号码 排队
    public void callNumber(){
        System.out.println("我是土豪我有钱 不需要叫号排队 直接进入VIP窗口");
    }
    //2.去窗口办理
    public void transact(){
        System.out.println("我是土豪我有钱 甩一张限量黑卡 取1000W 买车");
    }
    //3.办理完毕离开啦
    public void leave(){
        System.out.println("帅气的提着一袋子钱离开啦");
    }
}

public class Test {
    public static void main(String[] args){
        Bank bank = new Bank();
        Person p = new OldMan("长者");
        bank.profession(p);//银行欢迎长者进来办理业务

//        Person p = new YoungMan("年轻人");
//        bank.profession(p);

//        Person p = new Toff("土豪");
//        bank.profession(p);

        //按照刚才的设计 可能有问题
        //1.三个不同的人类方法名不一致(可以)
        //2.银行办理业务的方法写了三个
        //解决如上所述的问题   可以在三个人类之上创建一个父类
        //1.解决三个人类中的相同代码 比如name属性 比如get方法之类的
        //2.父类定义的三个方法可以是抽象 解决了子类命名不一致的问题 子类执行也不一致
        //3.父类可以作为参数传入银行
    }
}


```