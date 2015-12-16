using System;
using Nancy;

namespace RestService.NancyFx.Host
{
    public class MainModule : NancyModule
    {
        public MainModule()
        {
            Before += ctx =>
            {
                Console.Out.WriteLineAsync("Before Request.");

                // A return value of null means that no action is taken by the interceptor and that the request should proceed to be processed by the matching route.
                return null;
            };

            After += ctx =>
            {
                // Modify ctx.Response
            };

            Get["/"] = parameters => "Hello World!";
        }

        // https://github.com/NancyFx/Nancy/wiki/Model-binding#list-delimiters-in-html-forms
    }
}
