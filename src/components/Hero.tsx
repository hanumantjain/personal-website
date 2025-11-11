const Hero = () => {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="font-mono text-xs text-muted-foreground mb-8">
            console.log('Hello, World!')
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hanumant Jain{" "}
            <br />
            <span className="inline-block">
              <span className="text-foreground">[</span>
              <span className="text-muted-foreground">
                Full-Stack Developer
              </span>
              <span className="text-foreground">]</span>
              <span className="font-mono text-xl align-top">\</span>
            </span>
          </h1>
  
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating modern web applications with clean code and elegant solutions.
            Passionate about performance, user experience, and developer tools.
          </p>
        </div>
      </section>
    );
  };
  
  export default Hero;
  