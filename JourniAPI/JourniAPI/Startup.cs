using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JourniAPI.Models;
using JourniAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

namespace JourniAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("Cors", builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));
            services.Configure<JourniDatabaseSettings>(
                Configuration.GetSection(nameof(JourniDatabaseSettings)));

            services.AddSingleton<IJourniDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<JourniDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();
            services.AddSingleton<TripService>();
            services.AddSingleton<DayService>();
            services.AddSingleton<PlaceService>();

            services.AddControllers().AddNewtonsoftJson(options => options.UseMemberCasing());

            string domain = $"https://dev-xjne16pd.auth0.com/";
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                //options.Audience = Configuration["https://localhost:5001/api"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudiences = new List<string>
                    {
                        "https://localhost:5001/api",
                        "https://dev-xjne16pd.auth0.com/userinfo"
                    },
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("read:trips", policy => policy.Requirements.Add(new HasScopeRequirement("read:trips", domain)));
                options.AddPolicy("create:trips", policy => policy.Requirements.Add(new HasScopeRequirement("create:trips", domain)));
                options.AddPolicy("edit:trips", policy => policy.Requirements.Add(new HasScopeRequirement("edit:trips", domain)));
                options.AddPolicy("delete:trips", policy => policy.Requirements.Add(new HasScopeRequirement("delete:trips", domain)));
            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
         
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("Cors");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
